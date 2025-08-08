this is better collabvm made in chatgpt!! it awyy better then noob collabvm!! 

idk only one vm skill issue!!

# Fucker Instructions
You need QEMU NODE.JS NPM AND NOVNC TO RUN THIS SHIT! assuming you are runnig debian. get qemu with `sudo apt install qemu-system`. nodejs with `sudo apt install nodejs` and `sudo apt install npm`. TO get novnc you need to go to the public folder, `mkdir vendor`, `git clone https://github.com/novnc/noVNC.git` (you may need sudo) Now go back to root directory and `npm i` (you may also need sudo) You are fucking ready... For the vnc you need websockify too do `sudo apt install websockify` ans `websockify 6080 localhost:5901`, run your VM with a qemu command however you want idfk but make sure it has `-vnc :1` in it. NOW RUN SERVER `node server` and watch fucker vm.

# Fucker Bonus!
If you are tunneling this crap set up nginx for one tunnel!!!! Follow this shit or something https://computernewb.com/wiki/UserVM_Handbook#Setting_up_reverse_proxying
