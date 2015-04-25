#!/usr/bin/env osascript
tell application "Google Chrome"
  -- excludes shadow margin 112px
  set chromeWindow to make new window with properties {bounds: {0, 0, 1168, 688}}
  activate
  delay 1

  tell application "System Events"
    key code 48 using {shift down} -- shift-tab
    repeat 3 times
      key code 36 -- enter
    end repeat
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot1.png"
  do shell script "convert -crop 640x400+56+32 build/screenshot1{,s}.png"

  tell application "System Events"
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot2.png"
  do shell script "convert -crop 640x400+56+32 build/screenshot2{,s}.png"

  close chromeWindow
end tell

