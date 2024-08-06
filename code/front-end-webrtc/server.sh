#!/bin/sh
uv4l --external-driver --device-name=video2 \
--server-option '--enable-www-server=yes' --server-option '--www-root-path=/home/pi/custom/front-end-webrtc' \
--server-option '–www-index-file=index.html' --server-option '--www-port=9000' \
--server-option '--www-webrtc-signaling-path=/stream/webrtc' --server-option '--enable-webrtc=yes' \
--server-option '--enable-webrtc-video=yes' --server-option '--enable-webrtc-audio=yes' \
--server-option '–-enable-webrtc-datachannels=yes' --server-option '--webrtc-receive-audio=yes' \
--server-option '--webrtc-received-audio-volume=10' --server-option '--www-use-ssl=yes' \
--server-option '--www-ssl-private-key-file=/etc/ssl/private/selfsign.key' --server-option '--www-ssl-certificate-file=/etc/ssl/certs/selfsign.crt' \
--server-option '--user-password=tablebot' --server-option '--www-password=tablebot' \
--server-option '--webrtc-renderer-window=100' --server-option '--webrtc-renderer-window=-40' \
--server-option '--webrtc-renderer-window=600' --server-option '--webrtc-renderer-window=400' \
--server-option '--config-password=tablebot'
