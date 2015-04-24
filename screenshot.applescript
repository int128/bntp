#!/usr/bin/env osascript
tell application "Google Chrome"
  set chromeWindow to make new window with properties {bounds: {0, 0, 1280, 800}}
  activate

  tell application "System Events"
    delay .5
    key code 48 using {shift down} -- shift-tab
    repeat 3 times
      key code 36 -- enter
    end repeat
    key code 48 -- tab
    delay .5
  end tell
  -- whole window
  do shell script "screencapture -w build/screenshot1.png"

  tell application "System Events"
    delay .5
    repeat 10 times
      key code 48 -- tab
    end repeat
    delay .5
  end tell
  -- with baloon tip
  do shell script "screencapture -w build/screenshot2.png"
  -- for smaller
  do shell script "screencapture -s build/screenshot3.png"

  close chromeWindow
end tell
