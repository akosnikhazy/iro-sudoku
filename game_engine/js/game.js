/*
// Ákos Nikházy's Sudoku Game Engine from 2013
// -Checking if all items are filled
// -If all items are filled check if it is a win
// -It can load puzzles. 
//  A puzzle is an array of numbers, with 82 items. The first item can be the name, or a dummy value.
// -It isn't jQuery dependent but I ship it with jQuery. This way it is easier to set up controls
//  if you want it to use without jQuery you should write your own controls. Be aware that fillTable()
//  function has a jQuery line in the middle of it for changing the state of the items. 
//  (I should really change it to getElementById, but I just want to upload it almost as is)
// -Every item has id like this "line_column". It is important for the script to be like this.
//  (there are rally better solutions than this :D)
//  
// You are free to use this. Please mention me in code or on the app you create from it.
//  
// I use this engine in this app:	http://color-sudoku.nikhazy-dizajn.hu/
// My site: 						http://nikhazy-dizajn.hu/
// 
// (c) Ákos Nikházy
// A note from 2020:
// This is one of my old codes, so it is very unoptimised and 
// uses jQuery as back then it was much easier to use for making
// controls. It is really pointless to use it here. I will not
// change it for this upload.
*/
$(document).ready(function(){
	var play = new Array,banned = new Array,colors = new Array("#9999FF","#75D6FF","#0AFE47","#FF8A8A","#FFB60B","#E1E1A8","#4A9586","#EFEDFC","#DBF0F7"),selectedNumber = 1;
	
	//Gets the position in the table array from the id
	function getPos(t,id)
	{
		id		=	id.split('_');
		return (id[0]*9)-(9-id[1]);
	}
	
	//Fills the table based on the given array 
	function fillTable(t)
	{
		var line_pos	= 1;
		var column_pos	= 1;
		
		for(var i = 1;i<=81;i++)
		{
			//set position			
			if(column_pos > 9)
			{
				line_pos++;
				column_pos = 1;
			}
			
			/*THIS IS THE PLACE WHERE YOU DECIDE HOW IT LOOKS*/
			$('#'+line_pos+'_'+column_pos).html(t[i])
			/* ------------ */
			
			column_pos++;
		}
	}
	
	//set up bannedd items
	function banHammer(t)
	{
		var bannedItems = new Array();
		
		for(var i = 1;i<=81;i++)
		{
			if(t[i] == 0)
			{
				bannedItems.push(i);
				
			}
		}
		
		return bannedItems;
	}
	
	//check if it all filled. Faster than checking good solution all the time
	function allFilled(t)
	{
		for(var i = 1;i<=81;i++)
		{
			if(t[i] == 0)return false;
		}
		return true;
	}
	
	function isWin(t)
	{
		//line
		var item = 1;
		var lineSum = 0;
		for(var i = 1;i<=81;i++)
		{
			if(item > 9)
			{
				item = 1;
				//1+2+3+4+5+6+7+8+9 if a line has other value than 45 it is fail
				
				if(lineSum != 45){
					console.log('bad line at: '+i+' sum: '+lineSum)
					return false;
				}else 
					lineSum = 0;
			}
			lineSum += t[i];
			
			item++;
			
		}
		
		
		//colums
		var columns 		= new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		var columnCounter 	= 0;
		var lineCounter 	= 0;
		for(var i = 1;i<=81;i++)
		{
			
			if(columnCounter > 8)
			{
				lineCounter++;
				columnCounter = 0;
			}
			
			columns[columnCounter][lineCounter] = t[i];
			
			columnCounter++;
		}
		var columnSum = 0;
		for(var i=0;i<9;i++)
		{
			
			for(var j = 0;j<9;j++)
			{
				columnSum += columns[i][j]
			}
			if(columnSum != 45){
				console.log('bad column at: '+i+' sum: '+columnSum)
				return false;
			}else
				columnSum = 0;
		
		}
		
		//blocks
		var blocks			= new Array(new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array(),new Array());
		var columnCounter 	= 0;
		var lineCounter 	= 0;
		var blockBase = 0;
		var blockNumber = 0;
		for(var i = 1;i<=81;i++)
		{
			
			if(columnCounter > 8)
			{
				lineCounter++;
				columnCounter = 0;
			}
			if(lineCounter > 2 && lineCounter < 6){
				blockBase = 3
			} else if (lineCounter > 5 ){
				blockBase = 6
			}
			if(columnCounter <=2){
				blockNumber = 0;
			} else if(columnCounter > 2 && columnCounter <=5){
				blockNumber = 1
			} else {
				blockNumber = 2
			}
			
			blocks[blockBase+blockNumber].push(t[i]);
			
			columnCounter++;
		}
		
		var blockSum = 0;
		for(var i=0;i<9;i++)
		{
			
			for(var j = 0;j<9;j++)
			{
				blockSum += blocks[i][j]
			}
			console.log(blockSum)
			if(blockSum != 45){
				console.log('bad block at: '+i+' sum: '+blockSum)
				return false;
			}else
				blockSum = 0;
		
		}
		
		console.log('win');
		return true;
	}
	
	//ini. returns a copy of the preset for furter use.
	function ini(t)
	{
		win = false;
		banned = banHammer(t);
		play = t.slice();
		fillTable(t);
	}
	
	var table = new Array(0,
		1,6,0,4,0,9,8,0,0,
		4,2,0,0,0,1,5,0,0,
		0,0,5,8,0,0,0,4,3,
		5,0,2,7,0,8,0,9,1,
		0,0,0,0,9,0,0,0,0,
		8,7,0,1,0,3,2,0,6,
		9,3,0,0,0,5,6,0,0,
		0,0,1,9,0,0,0,3,2,
		0,0,4,6,0,7,0,1,5
		);
	
	/*bad solution for testing*/
	var table2 = new Array(1,
		1,2,3,4,5,9,8,7,6,
		4,5,6,1,1,1,5,1,1,
		7,8,9,8,1,1,1,4,3,
		5,1,2,7,1,8,1,9,1,
		1,1,1,1,9,1,1,1,1,
		8,7,1,1,1,3,2,1,6,
		9,3,1,1,1,5,6,1,1,
		1,1,1,9,1,1,1,3,2,
		1,1,4,6,1,7,1,1,5
		);
	
	/*good solution for testing (the last one is a five)*/
	var solution = new Array(1,
		1,6,3,4,5,9,8,2,7,
		4,2,8,3,7,1,5,6,9,
		7,9,5,8,2,6,1,4,3,
		5,4,2,7,6,8,3,9,1,
		3,1,6,5,9,2,4,7,8,
		8,7,9,1,4,3,2,5,6,
		9,3,7,2,1,5,6,8,4,
		6,5,1,9,8,4,7,3,2,
		2,8,4,6,3,7,9,1,0
		);
	
	
	ini(solution);	
	
	$("#game div").click(function(){
		var id = $(this).attr('id');
		var pos = getPos(play,id);
		
		
		if(banned.indexOf(pos) != -1)
		{
			//Move becouse it isn't a banned item
			play[pos] = parseInt(selectedNumber);
			$('#'+id).html(selectedNumber);
			if(allFilled(play)){
				if(isWin(play)){
					alert('Win');
				}
			}
		}
		
		
	});
	
	$("#numbers div").click(function(){
		selectedNumber = $(this).attr('id');
	})
	

});	