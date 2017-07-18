#!/usr/bin/env osascript
tell application "Google Chrome"
  -- open for large (excludes shadow margin 112px)
  set chromeWindow to make new window with properties {bounds: {0, 0, 1168, 688}}
  activate
  delay 1

  -- default and activate demo
  execute active tab of chromeWindow javascript "localStorage.clear()"
  execute active tab of chromeWindow javascript "sessionStorage.clear()"
  execute active tab of chromeWindow javascript "sessionStorage.setItem('demo', true)"

  execute active tab of chromeWindow javascript "localStorage.setItem('FOLDER_PREFERENCES', '[{\"id\":\"3\",\"collapsed\":true},{\"id\":\"7\",\"collapsed\":true},{\"id\":\"Chrome\",\"collapsed\":true}]')"

  -- theme
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-light.png"

  -- theme
  execute active tab of chromeWindow javascript "localStorage.setItem('APP_PREFERENCE', '{\"theme\":\"dark\"}')"
  reload active tab of chromeWindow
  delay 1
  do shell script "screencapture -w build/screenshot-whole-dark.png"

  -- preferences
  execute active tab of chromeWindow javascript "localStorage.setItem('APP_PREFERENCE', '{\"theme\":\"solarized-light\"}')"
  reload active tab of chromeWindow
  delay 1
  tell application "System Events"
    repeat 3 times
      key code 48 using shift down -- tab
    end repeat
  end tell
  do shell script "screencapture -w build/screenshot-tail-solarized-light.png"

  -- popup
  execute active tab of chromeWindow javascript "location.href = 'http://www.example.com'"
  delay 1
  tell application "System Events"
    click at {1120, 80}
  end tell
  delay 1
  do shell script "screencapture -w build/screenshot-popup-light.png"

  -- inactivate demo mode
  execute active tab of chromeWindow javascript "sessionStorage.clear()"
  execute active tab of chromeWindow javascript "localStorage.clear()"
  close chromeWindow
end tell
