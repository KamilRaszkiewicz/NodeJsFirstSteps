const ANGULAR_VELOCITY = 1.45 * Math.PI / 1000;
const VELOCITY_SCALE = 0.15;
const game = {
    cvs: null,
    ctx: null,
    socket: null,
    last_tick: null,
    players: [], // 0 is me
    keys_pressed: {
        a: false,
        d: false
    },
    setup : function (canvas_element, io_socket, width, height) {
        this.cvs = canvas_element;
        this.ctx = this.cvs.getContext("2d");
        this.socket = io_socket;
        this.cvs.width = width;
        this.cvs.height = height;

        document.addEventListener('keydown', event => {
            
        });
        for(var i=0; i<4; i++){
            var p = new player(0, 0, 0, 0);
            this.randomisePlayer(p);
            this.players.push(p);
        }
    },

    randomisePlayer : function (p) { 
        p.position.x = 0.7 * Math.random() * this.cvs.width;
        p.position.y = 0.7 * Math.random() * this.cvs.height;

        p.velocity.angle = Math.atan2(p.position.y - this.cvs.height/2, p.position.x - this.cvs.width/2) + Math.PI; //towards the center
        p.velocity.x = Math.cos(p.velocity.angle);
        p.velocity.y = Math.sin(p.velocity.angle);
    },

    emitPlayer : function(){
        this.socket.emit('ready', JSON.stringify(this.players[0]));
    },

    addPlayer : function (json) { 
        this.players.push(JSON.parse(json));
    },

    run : function() {
        this.drawPlayers();
        setTimeout(()=>{
            this.last_tick = performance.now();
            window.requestAnimationFrame(loop);
        }, 1000);
    },
    updatePlayers : function (deltaT) { 
        this.players.forEach(element => {
            element.position.x += element.velocity.x *VELOCITY_SCALE * deltaT;
            element.position.y += element.velocity.y *VELOCITY_SCALE * deltaT;
    
            switch(element.current_tilt){
                case -1: {
                    element.velocity.x = Math.cos(element.velocity.angle + ANGULAR_VELOCITY*deltaT);
                    element.velocity.y = Math.sin(element.velocity.angle + ANGULAR_VELOCITY*deltaT);
                    element.velocity.angle += ANGULAR_VELOCITY*deltaT;
                    break;
                }
                case 1: {
                    element.velocity.x = Math.cos(element.velocity.angle - ANGULAR_VELOCITY*deltaT);
                    element.velocity.y = Math.sin(element.velocity.angle - ANGULAR_VELOCITY*deltaT);
                    element.velocity.angle -= ANGULAR_VELOCITY*deltaT;
                    break;
                }
                default: break;
            }   
        });
    },

    drawPlayers : function() {
        this.players.forEach(element => {
            this.ctx.fillStyle = "#17B890";
            this.ctx.beginPath();
            this.ctx.arc(element.position.x, element.position.y, 2 , 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
};
function loop (timestamp) {
    var dt = timestamp - game.last_tick;
    game.last_tick = timestamp;
    game.updatePlayers(dt);
    game.drawPlayers();

    window.requestAnimationFrame(loop);
};

function player(position_x, position_y, velocity_x, velocity_y){
    this.current_tilt = 0; // -1 : left, 0 : none, 1 : right
    this.position = {
        x: position_x,
        y: position_y
    },

    this.velocity = {
        x: velocity_x,
        y: velocity_y,
        angle: Math.atan2(velocity_y, velocity_x),
    }
}


