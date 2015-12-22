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
  do shell script "screencapture -w build/screenshot1l.png"

  tell application "System Events"
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot2l.png"

  -- activate theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'dark')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot1d.png"

  -- activate theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'solarized-light')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot1sl.png"

  -- activate theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'solarized-dark')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot1sd.png"

  -- inactivate demo mode
  execute active tab of chromeWindow javascript "localStorage.removeItem('demo')"
  execute active tab of chromeWindow javascript "localStorage.removeItem('theme')"
  close chromeWindow

  -- generate small
  do shell script "for f in build/screenshot*.png; do convert -crop 640x400+56+32 $f $f-small.png; done"
end tell
