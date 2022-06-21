const game = {
    cvs: null,
    ctx: null,
    socket: null,
    players: [], // 0 is me

    setup : function (canvas_element, io_socket, width, height) {
        this.cvs = canvas_element;
        this.ctx = this.cvs.getContext("2d");
        this.socket = io_socket;
        this.cvs.width = width;
        this.cvs.height = height;

        document.addEventListener('keydown', event => {
            
        });
        this.players[0] = new player(0, 33, 22, 1, 7);
        this.ready();
    },

    ready : function(){
        this.socket.emit('ready', JSON.stringify(this.players[0]));
    }
};

function player(id, position_x, position_y, speed_x, speed_y){
    this.id = id;
    this.name ="Jarosław"; 
    this.position = {
        x: position_x,
        y: position_y
    },

    this.velocity = {
        x: speed_x,
        y: speed_y,
    }

    this.update = function (deltaT) { 
        this.position.x += this.velocity.x * deltaT;
        this.position.y += this.velocity.y * deltaT;
    }
}

