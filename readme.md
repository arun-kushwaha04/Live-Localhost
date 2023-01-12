# Local To Live

Make your local host live. Inspried from free services like localtunnel.

## Problem trying to solve

While localtunnel is a great open sevrvice by your live url will be varying always. I tried to solve this problem using this project.

## Basic architecture

## How to use

- Clone the repo using `git clone https://github.com/arun-kushwaha04/Live-Localhost.git`
- Edit `server/sever.js` based on your requirement, comment are provied where you have to take a look. Else you are good to go.
- Deploy your server on any free service like Render. Get the server public url this will act as proxy server.
- Now go to `client/clinet.js` and and update variable `proxySeverUrl` with proxy server url.
- Update `localUrl1` with the local url of the server running on you local PC `ex. http://localhost:8000`.
- Now try to access your proxy sever. You should be able to see you local content server on internet.
