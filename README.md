# Audio Recorder

## About
Audio Recorder is a protoype web application that allows users to quickly record audio using their device microphone and playback previous recordings. The app is built with vanilla Javascript and a simple Node/Express server to emulate storage of audio recordings. 

## Steps to run demo
**Note: Node.js is required to be installed prior to running this application. Directions to install are in prerequisites section below.

1. Clone repo to local machine entering terminal command: `git clone https://github.com/connorleee/Audio-Recorder.git` once in the directory you would like to clone into.
2. Change directory to the cloned Audio-Recorder repo.
3. Enter command `npm install` to install all required npm packages.
4. Enter command `npm run start` to open index.html and start the server on port 3000.
5. Accept browser prompt requesting access to microphone.

## Project Requirements
1. Create a prototype web application which captures audio while a button is pressed and sends
the audio over the network to a server. In addition to recording, the app should have a way to
play the captured audio back.
2. Create a simple web server that receives the audio. What it does with the audio is up to you,
but at minimum it should store it so that it can be played back.
3. Be able to explain the code at the level a junior dev could understand, justify design
decisions, choice of dependencies, trade-offs, etc.

## Additional notes
### Architecture/Design Decisions
- The decision to save a recording instantly after releasing the click was made to eliminate extra barriers for a user to use the feature such as naming a file, etc. 
- Record button needed to have positive feedback when recording to eliminate any confusion by end user.
- Unearth fonts and color themes were utilized.

### Technical Decisions
- The recording functionality utilizes the Media Streams API that is natively supported by all modern browsers. For future releases, support for Internet Explorer may need to be considered based on customer needs/preferences.
- In order to support multiple recordings, the "audio recorder" is set up as an object to maintain context on individual recordings. Additionally, the object can be abstracted to different files and exported as a module for reuse.
- Data is stored as an an object on the server to allow flexibility to support more data such as file names, creation times, etc in future releases. Currently only an array of blob URLs is utilized for prototyping purposes.

### Future Optimizations
- Store actual audio files in DB instead of blob URLs
- Added error handling 
  - Recordings fail if record button is tapped
  - Ensure server connection is established before user begins recording to prevent data loss
- Add support for naming, deleting, filtering, and sorting recordings
- Allow user to hold a key instead of clicking mouse to record
- Allow user to toggle record instead of holding click
- Add unit testing
- Modularize audio recorder for reuse

## Prerequisites
### Node
 
**Mac OS** [1]

Before you can install Node on Mac OS, you’ll need to install two other applications. Fortunately, once you have these on your machine, installing Node takes just a few minutes.

> - **XCode** Apple’s XCode development software is used to build Mac and iOS apps, but it also includes the tools you need to compile software for use on your Mac. XCode is free and you can find it in the Apple App Store.
> 
> - Via Terminal `xcode-select --install`
> 
> - **Homebrew** Homebrew is a package manager for the Mac — it makes installing most open source sofware (like Node) as simple as writing `brew install node`.
> - To install Homebrew just open Terminal and type `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`. You’ll see messages in the Terminal explaining what you need to do to complete the installation process. Now type `brew install node`.

**Windows Installation Steps** [2]
> - Download the Windows installer from the [Nodes.js®](http://nodejs.org/) web site.
> - Run the installer (the .msi file you downloaded in the previous step.)
> - Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
> - Restart your computer. You won’t be able to run Node.js until you restart your computer.

## Acknowledgments

[1] Adapted from instructions found here: <a href="https://blog.teamtreehouse.com/install-node-js-npm-mac" target="_blank">https://blog.teamtreehouse.com/install-node-js-npm-mac</a>

[2] Adapted from instructions found here: <a href="https://blog.teamtreehouse.com/install-node-js-npm-windows" target="_blank">https://blog.teamtreehouse.com/install-node-js-npm-windows</a>

