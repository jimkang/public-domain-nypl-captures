public-domain-nypl-captures
==================

Gets captures from the public domain part of the NYPL Digital Collection.

Installation
------------

    npm install public-domain-nypl-captures

Usage
-----

Getting a random item that contain captures:

    var nyplCaptures = require('public-domain-nypl-captures');
    nyplCaptures.getRandomItem(logItem);

    function logItem(error, item) {
      if (error) {
        console.log(error, error.stack);
      }
      else {
        console.log(JSON.stringify(item, null, '  '));
      }
    }

Output:

    {
      "UUID": "4f3fb950-47ae-0130-b42b-58d385a7b928",
      "databaseID": 4885857,
      "title": "Fields, [James T.], ALS to. Jan. 12, 1851.",
      "alternativeTitle": [],
      "contributor": [
        {
          "contributorName": "Hawthorne, Nathaniel, 1804-1864",
          "contributorType": false,
          "contributorRole": [
            "Author"
          ],
          "contributorURI": "http://viaf.org/viaf/44435463"
        },
        {
          "contributorName": "Fields, James Thomas, 1817-1881",
          "contributorType": "personal",
          "contributorRole": [
            "Addressee"
          ],
          "contributorURI": "http://viaf.org/viaf/1254825"
        }
      ],
      "date": [
        "1851-01-12"
      ],
      "dateStart": 1851,
      "dateEnd": null,
      "language": [],
      "description": [],
      "note": [
        {
          "type": "citation/reference",
          "text": "Centenary Edition, XVI, The Letters 1843-1853, p. 382, #461."
        },
        {
          "type": "ownership",
          "text": "W. T. H. Howe"
        }
      ],
      "subjectTopical": [],
      "subjectName": [],
      "subjectGeographic": [],
      "subjectTemporal": [],
      "subjectTitle": [],
      "resourceType": [
        "text"
      ],
      "genre": [
        {
          "text": "Correspondence",
          "URI": "http://id.loc.gov/vocabulary/graphicMaterials/tgm002590"
        }
      ],
      "identifierBNumber": null,
      "identifierAccessionNumber": "134195B",
      "identifierCallNumber": "NH ALS to James Fields  Jan. 12, 1851",
      "identifierISBN": null,
      "identifierISSN": null,
      "identifierInterviewID": null,
      "identifierPostcardID": null,
      "identifierLCCN": null,
      "identifierOCLCRLIN": null,
      "physicalDescriptionExtent": [
        "1 double leaf"
      ],
      "physicalDescriptionForm": [
        "Letters"
      ],
      "publisher": [],
      "placeOfPublication": [
        "Lenox, MA"
      ],
      "collectionUUID": "84b97660-371f-0130-802e-58d385a7b928",
      "containerUUID": "e90ee1f0-3726-0130-08a6-58d385a7b928",
      "collectionTitle": "Nathaniel Hawthorne collection of papers, 1694-1931 bulk (1817-1864)",
      "containerTitle": "Outgoing Correspondence",
      "parentHierarchy": "Nathaniel Hawthorne collection of papers, 1694-1931 bulk (1817-1864) / Correspondence / Outgoing Correspondence",
      "numberOfCaptures": 8,
      "captures": [
        "http://images.nypl.org/index.php?id=5053377&t=g",
        "http://images.nypl.org/index.php?id=5053378&t=g",
        "http://images.nypl.org/index.php?id=5053380&t=g",
        "http://images.nypl.org/index.php?id=5053379&t=g",
        "http://images.nypl.org/index.php?id=5053382&t=g",
        "http://images.nypl.org/index.php?id=5053383&t=g",
        "http://images.nypl.org/index.php?id=5053381&t=g",
        "http://images.nypl.org/index.php?id=5053384&t=g"
      ],
      "digitalCollectionsURL": "http://digitalcollections.nypl.org/items/4f3fb950-47ae-0130-b42b-58d385a7b928"
    }

Getting a single random capture image, along with some metadata about it.

    var nyplCaptures = require('public-domain-nypl-captures');
    var opts = {
      filterOutBrokenImageLinks: true,
      maxRetries: 5
    };
    nyplCaptures.getRandomCapture(opts, logCapture);

    function logCapture(error, capture) {
      if (error) {
        console.log(error, error.stack);
      }
      else {
        console.log(JSON.stringify(capture, null, '  '));
      }
    }

Output:

    {
      "sourceUUID": "8906f040-c54b-012f-cd7a-58d385a7bc34",
      "title": "The Lincoln Memorial",
      "imageURL": "http://images.nypl.org/index.php?id=4022569&t=g",
      "digitalCollectionsURL": "http://digitalcollections.nypl.org/items/8906f040-c54b-012f-cd7a-58d385a7bc34"
    }

The  `filterOutBrokenImageLinks` opt will make `getRandomCapture` to check each image link to make sure it's still good before selecting it. `maxRetries`, which defaults to 10, tells it how many times to retry if it gets back items with image links that are all bad (meaning not responding or not images).

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
