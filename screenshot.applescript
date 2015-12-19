#!/usr/bin/env osascript
tell application "Google Chrome"
  -- excludes shadow margin 112px
  set chromeWindow to make new window with properties {bounds: {0, 0, 1168, 688}}
  activate
  delay 1

  -- activate demo mode
  execute active tab of chromeWindow javascript "localStorage.setItem('demo', true)"
  execute active tab of chromeWindow javascript "localStorage.removeItem('theme')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot1.png"

  tell application "System Events"
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot2.png"

  -- activate dark theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'dark')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot3.png"

  tell application "System Events"
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot4.png"

  -- inactivate demo mode
  execute active tab of chromeWindow javascript "localStorage.removeItem('demo')"
  execute active tab of chromeWindow javascript "localStorage.removeItem('theme')"
  close chromeWindow

  -- generate small
  do shell script "convert -crop 640x400+56+32 build/screenshot1{,s}.png"
  do shell script "convert -crop 640x400+56+32 build/screenshot2{,s}.png"
  do shell script "convert -crop 640x400+56+32 build/screenshot3{,s}.png"
  do shell script "convert -crop 640x400+56+32 build/screenshot4{,s}.png"
end tell
