var spawn = require('child_process').spawn;

class FFMPEG {
    constructor() {
        this.cmd = '/usr/bin/ffmpeg'
        this.args = [
            '-i', 'rtsp://192.168.1.254/hello.mov',
            '-pix_fmt', 'yuv420p',
            '-codec:a', 'aac',
            '-f', 'v4l2', '/dev/video9'
        ]
        this.proc = spawn(this.cmd, this.args);

        this.proc.stdout.on('data', function(data) {
            console.log(data);
        });

        this.proc.stderr.setEncoding("utf8")
        this.proc.stderr.on('data', function(data) {
            console.log(data);
        });

        this.proc.on('close', function() {
            console.log('finished');
        });
    }

    getPID() {
        return this.proc.pid
    }
}

module.exports = FFMPEG;