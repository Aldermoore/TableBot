#!/bin/bash
function cleanup() #Method for making sure that all the background processes are killed
{
	echo "Cleaning up stuff!"
	killall ffmpeg
	sudo killall python3
	killall python3
	killall uv4l
	echo "Done cleaning up!"
}
trap cleanup EXIT #Starts the cleanup method once Ctrl+C is pressed 
sudo modprobe v4l2loopback && #Creates the digial camera device
v4l2-ctl --set-fmt-video=width=640,height=480 && #Makes sure the resolution is set before the rendering takes place
sleep 2 && bash ~/TableBot/code/front-end-webrtc/server.sh & #Starts the UV4L server after 3 seconds
sleep 1 && sudo python3 ~/TableBot/code/websocket-server/websocketServer.py & #Runs the websocketServer in the background
ffmpeg -i /dev/video0 -f v4l2 -codec:v rawvideo -pix_fmt yuv420p -vf "lenscorrection=cx=0.5:cy=0.5:k1=-0.187:k2=-0.022" /dev/video2 -loglevel quiet & #Encodes and copies the video feed to the digital video device
sleep 3 && mpv av://v4l2:/dev/video2 --hwdec=no --untimed --no-border --vf lavfi=[crop=640:200:0:140,hflip] --geometry=400x125+50%+100% #Runs the mpv player in the background after the sleep interval
