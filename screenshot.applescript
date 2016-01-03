#!/usr/bin/env osascript
tell application "Google Chrome"
  -- open for large (excludes shadow margin 112px)
  set chromeWindow to make new window with properties {bounds: {0, 0, 1168, 688}}
  activate
  delay 1

  -- default and activate demo
  execute active tab of chromeWindow javascript "localStorage.clear()"
  execute active tab of chromeWindow javascript "localStorage.setItem('demo', true)"

  -- theme
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-default.png"

  -- highlight
  tell application "System Events"
    repeat 3 times
      key code 48 -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot-highlight-default.png"

  -- theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'dark')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-dark.png"

  -- theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'solarized-light')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-solarized-light.png"

  -- preferences
  execute active tab of chromeWindow javascript "localStorage.setItem('showTopSites', 'false')"
  reload active tab of chromeWindow
  delay 1
  tell application "System Events"
    repeat 3 times
      key code 48 using shift down -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot-tail-solarized-light.png"

  execute active tab of chromeWindow javascript "localStorage.removeItem('showTopSites')"

  -- theme
  execute active tab of chromeWindow javascript "localStorage.setItem('theme', 'solarized-dark')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-solarized-dark.png"

  -- inactivate demo mode
  execute active tab of chromeWindow javascript "localStorage.clear()"
  close chromeWindow
end tell
