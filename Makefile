
all: install

install:
	mkdir -p /usr/lib64/mozilla/native-messaging-hosts/ytdlff
	cp -f ./ytdlff.json /usr/lib64/mozilla/native-messaging-hosts/
	cp -f ./backend.py /usr/lib64/mozilla/native-messaging-hosts/ytdlff/

uninstall:
	rm -rf /usr/lib64/mozilla/native-messaging-hosts/ytdlff
	rm -f /usr/lib64/mozilla/native-messaging-hosts/ytdlff.json
