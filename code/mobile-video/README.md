# Auto playing mobile video unit

Uses JSMPEG to play video frames

## Transcoding a compatible video

The player uses MPEG-1, which is a simple but *ancient* codec (pre-DVD). The unit is 320 wide, so for a 16:9 video, we need to encode a 320x180 target.

The size MUST be a multiple of two in width and height. This is usually not a problem, but beware.

Install `ffmpeg` (or `avconv`) and use this two pass transcode to get a decent quality/filesize ratio:

```
for PASS in 1 2;
do
ffmpeg \
  -i <input>.mp4 \
  -f mpeg1video \
  -vf "scale=320:180"                      # use a video filter to scale down to 320x180 \
  -b:v 300k                                # 300 kbit/s \
  -bf 0                                    # no-bframes (backframes) which is a requirement of jsmpeg \
  -mbd rd -trellis 2 -cmp 2 -subcmp 2      # some specific encoding optimisations \
  -pass $PASS \                            # which pass is this?
  <output>.mpg
done
```

This should use about a meg per 30 sec ad.  Warning - there will be some artifacts, as this is not a good codec.
