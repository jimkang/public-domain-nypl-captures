var getRandomItem = require('./get-random-item');
var sb = require('standard-bail')();
var probable = require('probable');
var headFilterURLs = require('head-filter-urls');
var callNextTick = require('call-next-tick');
var pathExists = require('object-path-exists');

function isImageMIMEType(response, done) {
  if (pathExists(response, ['headers', 'content-type'])) {
    callNextTick(
      done, null, response.headers['content-type'].indexOf('image/') === 0
    );
  }
  else {
    callNextTick(done, null, false);
  }
}

function getRandomCapture(opts, done) {
  var filterOutBrokenImageLinks;
  var maxRetries;
  var validSizes;

  if (opts) {
    filterOutBrokenImageLinks = opts.filterOutBrokenImageLinks;    
    maxRetries = opts.maxRetries;
    validSizes = opts.validSizes;
  }

  if (maxRetries === undefined) {
    maxRetries = 10;
  }
  var retries = 0;

  getRandomItem(sb(distillItemToCapture, done));

  function distillItemToCapture(item, outerDone) {
    var capture = {
      sourceUUID: item.UUID,
      title: item.title,
      // imageURL: probable.pickFromArray(item.captures),
      digitalCollectionsURL: item.digitalCollectionsURL
    };

    if (filterOutBrokenImageLinks) {
      // console.log('Unfiltered:', item.captures);

      var filterOpts = {
        urls: item.captures,
        responseChecker: isImageMIMEType
      };
      headFilterURLs(filterOpts, sb(pickFromCaptureURLs, outerDone));
    }
    else {
      callNextTick(pickFromCaptureURLs, item.captures);
    }

    function pickFromCaptureURLs(urls) {
      capture.imageURL = probable.pickFromArray(urls);

      if (!capture.imageURL && retries < maxRetries) {
        retries += 1;
        // console.log('retries:', retries);
        callNextTick(getRandomItem, sb(distillItemToCapture, done));
      }
      else {
        if (validSizes) {
          var sizeSpecificURLs = getSizeSpecificURLs(capture.imageURL, validSizes);

          if (filterOutBrokenImageLinks) {
            var filterOpts = {
              urls: sizeSpecificURLs,
              responseChecker: isImageMIMEType
            };
            headFilterURLs(filterOpts, sb(addPreferredURL, outerDone));
          }
          else {
            capture.preferredImageURL = sizeSpecificURLs[0];
            outerDone(null, capture);
          }
        }
        else {
          outerDone(null, capture);
        }
      }
    }

    function addPreferredURL(validURLs) {
      if (validURLs && validURLs.length > 0) {
        capture.preferredImageURL = validURLs[0];
      }
      // If there is no valid preferred size URL, that is OK. Pass back what we have.
      outerDone(null, capture);
    }
  }
}

function getSizeSpecificURLs(originalSizeURL, sizes) {
  return sizes.map(getSizeSpecificURL);

  function getSizeSpecificURL(size) {
    return originalSizeURL.replace('&t=g', '&t=' + size);
  }
}

module.exports = getRandomCapture;
