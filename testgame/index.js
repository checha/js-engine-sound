Interface.setDescription("<p>Diego the hunter has been enjoying a few beers and decides to hunt for his upcoming fiesta.</p><p>He's having trouble hitting his mark.</p><p>Help Diego bring home a trophy duck.</p>");

var scene = new Figure ({
    domElement: {name: "scene", style: 'overflow: hidden;'},
    width: 890,
    height: 550,
    image: "images/Scene.png",
    frames: [
        new Frame({
            x: 0, y: 0,
            duration: 0,
            playNext: false,
        }),
		new Frame({ // pregame
			action:function() {
				console.log('pregame');
				// bug!!!
				//object0.play('a-1');

				//setTimeout(function() {
				object0.play('a-1');//
				//}, 1300);

				// add objects
				

			}
		}),
		new Frame({ // begin(play)
			action: function() {
				console.log('play');
			
				//object0.play('normal1');// 0-1-2-3-4
				
				
				
					
			}
		}),
		//new Frame(), //fail
		//new Frame(), //draw
		//new Frame(), //win
		//new Frame(), //winx5
    ],
    animations: {
        'normal': new Animation({
            sequence: '0',
        }),
		'pregame': new Animation({
            sequence: '1'
        }),
		'begin': new Animation({
			sequence: '2'
		}),
		'fail': new Animation({
			sequence: '4'
		}),
		'draw': new Animation({
			sequence: '3'
		}),
		'win': new Animation({
			sequence: '3'
		}),
		'winx5': new Animation({
			sequence: '3'
		}),
    },
	sounds: {
		'test': new Sound('cannon')
	}
});


var object0 = new Figure({
	domElement: {name: "object0", parent:"scene"},
	image: "images/hunter.png",
	width: 272,
    height: 208,
	left: 500,
    top: 200,
	frames:[new Frame({x: 0, y: 1, duration: 1500}),
            new Frame({x: 1, y: 1, duration: 1500}),
			new Frame({x: 2, y: 1, duration: 1400}),
			new Frame({x: 3, y: 1, duration: 1500}),
			new Frame({x: 4, y: 1, duration: 1500, action: function(){
				//object0.play('a-2');
				//scene.sounds.test.play();
			}}),
			new Frame({x: 0, y: 2, duration: 1500}),
            new Frame({x: 1, y: 2, duration: 1500}),
			new Frame({x: 2, y: 2, duration: 1500}),
			new Frame({x: 3, y: 2, duration: 1500}),
			new Frame({x: 4, y: 2, duration: 1500})
        ],
	animations: {
        'normal': new Animation({
            sequence: '0',
			//looping: true
        }),
		'a-1': new Animation({
			sequence: '0-1-2-3-4',
			looping: true
		}),
		'a-2': new Animation({
			sequence: '5-6-7-8-9',
			looping: true
		})
    },
});



/*


var object0 = new Figure({
    domElement: {name: "bear", parent:"scene"},
    image: "images/bear_733_147/bear.png",
    left: 500,
    top: 200,
    width: 298/2,
    height: 119,
    
    frames:[new Frame({x: 0, y: 0}),
            new Frame({x: 1, y: 0, duration: 900})
        ],
    animations: {
        'normal': new Animation({
			console.log('animation: normal');
            sequence: '0'
        }),
        'scared': new Animation({
			console.log('animation: scared');
            sequence: '1-0'
        })
    },
});

*/


Scheme.setFigure(scene);
//Scheme.setLogic(ducks.setReactions);
