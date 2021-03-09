var assert = require('assert');
var validURL = require('../helpers/util/util');
var getDadJoke = require('../baseCommands/funny/dadjokeBase');
var getGif = require('../baseCommands/gifs/memeBase');
var getHolidayInfo = require('../baseCommands/holiday/holidayBase');

describe('funny', () => {
    describe('#getDadJoke()', () => {
        it('should return a string which is a dad joke', (done) => {
            getDadJoke()
                .then((dadjoke) => {
                    if (dadjoke) {
                        done()
                    } else {
                        assert.fail("dad joke not found");

                    }
                })

        })
    })
})

describe('gifs', () => {
    describe('#getGif(searchText)', () => {
        it('should return a string with a link, or text showing no gifs found', (done) => {
            getGif("testing", (gifInfo) => {
                if (gifInfo) {
                    if (validURL(gifInfo)) {
                        done();
                        assert.ok(gifInfo, "is a url!");
                    } else {
                        assert.fail("did not find any memes");
                    }
                } else {
                    assert.fail("Gif returned is null!");
                }
            });

        })
    })
})

describe('holiday', () => {
    describe('#getHolidayInfo()', () => {
        it('should return the URL for the current day holiday', (done) => {
            getHolidayInfo()
                .then((holidayInfo) => {


                    if (holidayInfo) {



                        if (validURL(holidayInfo.holidayURL)) {

                            done();

                        } else {

                            assert.fail("holiday URL is not a URL")

                        }

                    } else {
                        assert.fail("Did not contain Holiday Info");
                    }
                })

        })
    })
})