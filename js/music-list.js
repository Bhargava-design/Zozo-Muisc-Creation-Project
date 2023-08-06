// External Files:
// https://api.html5media.info/1.1.8/html5media.min.js (enables <video> and <audio> tags in all major browsers)
// https://cdn.plyr.io/2.0.13/plyr.js


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://archive.org/download/alan_walker_sabrina-on_my_way48k/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Cure For Me",
                "length": "03:22",
                "file": "AURORA_-_Cure_For_Me(48k)"
            }, {
                "track": 2,
                "name": "On My Way",
                "length": "03:37",
                "file": "Alan_Walker,_Sabrina-On_My_Way(48k)"
            }, {
                "track": 3,
                "name": "Alone",
                "length": "04:05",
                "file": "Alan_Walker_&_Ava_Max_-_Alone(48k)"
            }, {
                "track": 4,
                "name": "Scars_To_Your_Beautiful",
                "length": "05:10",
                "file": "Alessia_Cara_-_Scars_To_Your_Beautiful(48k).mp3"
            }, {
                "track": 5,
                "name": "Arcade",
                "length": "03:04",
                "file": "Arcade(48k)"
            }, {
                "track": 6,
                "name": "Dandelions",
                "length": "4:29",
                "file": "Dandelions(48k)"
            }, {
                "track": 7,
                "name": "INDUSTRY_BABY",
                "length": "03:55",
                "file": "INDUSTRY_BABY(48k)"
            }, {
                "track": 8,
                "name": "Imagine_Dragons",
                "length": "04:33",
                "file": "Imagine_Dragons_-_Thunder(48k)"
            }, {
                "track": 9,
                "name": "Infinity",
                "length": "03:58",
                "file": "Jaymes_Young_-_Infinity(48k)"
            }, {
                "track": 10,
                "name": "Love_Me_Like_You_Do",
                "length": "04:09",
                "file": "Love_Me_Like_You_Do(48k)"
            }, {
                "track": 11,
                "name": "Girls Like You",
                "length": "04:31",
                "file": "Maroon_5_-_Girls_Like_You_ft._Cardi_B(48k)"
            }, {
                "track": 12,
                "name": "No_Lie",
                "length": "03:49",
                "file": "Sean_Paul_-_No_Lie_ft._Dua_Lipa(48k)"
            }, {
                "track": 13,
                "name": "Unstoppable",
                "length": "03:47",
                "file": "Sia_-_Unstoppable(48k)"
            }, {
                "track": 14,
                "name": "Go_Down_Deh",
                "length": "03:06",
                "file": "Spice,_Sean_Paul,_Shaggy_-_Go_Down_Deh(48k)"
            }, {
                "track": 15,
                "name": "Stereo_Hearts",
                "length": "03:37",
                "file": "Stereo_Hearts_ft._Adam_Levine(48k)"
            }, {
                "track": 16,
                "name": "Sub_Urban_-_Cradles",
                "length": "03:39",
                "file": "Sub_Urban_-_Cradles_[Official_Music_Video](48k)"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});

//initialize plyr
plyr.setup($('#audio1'), {});