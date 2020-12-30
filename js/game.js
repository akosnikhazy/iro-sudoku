/* ------------------------- */
// Created by Ákos Nikházy 2013
// http://nikhazy-dizajn.hu
// nikhazy.akos@gmail.com
//
// A note from 2020:
// This is one of my old codes, so it is very unoptimised and 
// uses jQuery as back then it was much easier to use for making
// controls. It is really pointless to use it here. I will not
// change it for this upload.
/* ------------------------- */
$(document).ready(function(){
	var play = new Array,banned = new Array,win = false,colors = new Array,customColorScheme = new Array,selectedNumber = 1,selectedColorScheme = 0,selectedLevel = 1,levels = new Array,loadOrSave = 0;
	
	//Selectable Color Schemes
	colors = new Array(
					new Array("#FFFFFF","#9999FF","#75D6FF","#0AFE47","#FF8A8A","#FFB60B","#E1E1A8","#4A9586","#C0A545","#DBF0F7",'Happy'),
					new Array("#FFFFFF","#a1a1a1","#b2b2b2","#c3c3c3","#d4d4d4","#e5e5e5","#f0f0f0","#cccccc","#aaaaaa","#888888",'9 shades of grey'),
					new Array("#FFFFFF","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc",'Darker shades of grey'),
					new Array("#FFFFFF","#9E3800","#711200","#C87100","#441B09","#FBC34E","#F48042","#C5412A","#644667","#EEF883",'Autumn'),
					new Array("#FFFFFF","#EEF883","#A37E58","#CDBB99","#E8CAAF","#EEE0B7","#EBEFC9","#FCFBE3","#FBCFCF","#755C3B",'Cupcake'),
					new Array("#FFFFFF","#F8DAFB","#E8DAFB","#DADDFB","#DAEDFB","#DAFBF8","#F5DBD8","#ECDAD8","#E2D9D8","#D8D8D8",'Light Pastel'),
					new Array("#FFFFFF","#222","#222","#222","#222","#222","#222","#222","#222","#222",'Memory Power'),
					new Array("#FFFFFF","#D3E2B6","#C3DBB4","#AACCB1","#87BDB1","#68B3AF","#607848","#789048","#C0D860","#F0F0D8",'Swampy Forest'),
					new Array("#000","#899ECB","#6D8BC9","#3D62B3","#335795","#D8DFEA","#AFBDD4","#6D84B4","#3B5998","#FFF",'Facebook'),
					new Array("#FFFFFF","#13001C","#AB000B","#DE4A00","#FF8800","#FFF700","#FEDE7B","#FF6540","#C12F2A","#611824",'Fire'),
					new Array("rgb(232, 232, 232)","rgb(255, 0, 0)","rgb(156, 2, 2)","rgb(0, 0, 0)","rgb(184, 162, 162)","rgb(74, 35, 5)","rgb(46, 46, 46)","rgb(51, 24, 14)","rgb(161, 140, 85)","rgb(255, 255, 255)","Assassin"),
					new Array("rgba(0, 0, 0, 0)","rgb(232, 18, 182)","rgb(26, 46, 18)","rgb(189, 0, 0)","rgb(19, 19, 102)","rgb(255, 60, 0)","rgb(252, 252, 252)","rgb(0, 0, 0)","rgb(240, 177, 161)","rgb(100, 180, 204)","Trigger Happy Havoc"));
	
	//Selectable Levels
	levels = new Array(
		new Array('Basic 1',
		1,6,0,4,0,9,8,0,0,
		4,2,0,0,0,1,5,0,0,
		0,0,5,8,0,0,0,4,3,
		5,0,2,7,0,8,0,9,1,
		0,0,0,0,9,0,0,0,0,
		8,7,0,1,0,3,2,0,6,
		9,3,0,0,0,5,6,0,0,
		0,0,1,9,0,0,0,3,2,
		0,0,4,6,0,7,0,1,5
		),
		new Array('Basic 2',
		0,0,5,2,0,0,0,1,4,
		6,2,0,0,0,7,3,0,0,
		1,4,0,5,0,8,9,0,0,
		0,0,3,1,0,6,0,2,5,
		0,0,4,9,0,0,0,3,1,
		8,5,0,0,0,2,6,0,0,
		9,1,0,8,0,3,5,0,7,
		0,0,0,0,9,0,0,0,0,
		4,0,8,7,0,1,0,9,6
		),
		new Array('Basic 3',
		0,0,0,1,0,0,0,0,7,
		0,0,8,7,0,0,0,3,6,
		0,2,3,0,0,0,5,4,0,
		9,3,0,0,0,5,1,0,0,
		0,0,0,6,0,7,0,0,0,
		0,0,4,2,0,0,0,5,3,
		1,8,0,0,0,9,4,0,0,
		0,9,5,0,0,0,7,2,0,
		6,0,0,0,0,2,0,0,0
		),
		new Array('Intermediate 1',
		0,0,0,5,9,0,0,0,0,
		0,0,4,8,0,0,5,0,0,
		0,2,6,0,0,0,4,9,0,
		0,0,0,0,0,0,0,4,2,
		1,0,0,0,0,0,0,0,3,
		7,5,0,0,0,0,0,0,0,
		0,6,3,0,0,0,1,7,0,
		0,0,1,0,0,2,9,0,0,
		0,0,0,0,4,7,0,0,0
		),
		new Array('Intermediate 2',
		0,0,0,0,0,0,0,2,1,
		0,0,0,0,1,4,0,0,9,
		0,6,7,9,0,0,0,0,0,
		0,1,0,8,0,0,0,0,0,
		2,0,0,0,0,0,0,0,3,
		0,0,0,0,0,7,0,4,0,
		0,0,0,0,0,3,6,5,0,
		8,0,0,4,2,0,0,0,0,
		9,7,0,0,0,0,0,0,0
		),
		new Array('Intermediate 3',
		1,0,0,0,0,0,0,7,8,
		2,0,0,3,0,5,6,0,0,
		0,3,0,0,4,0,0,0,0,
		0,4,0,0,0,0,0,0,0,
		0,0,5,0,9,0,1,0,0,
		0,0,0,0,0,0,0,2,0,
		0,0,0,0,1,0,0,3,0,
		0,0,8,9,0,3,0,0,4,
		6,7,0,0,0,0,0,0,5
		),
		new Array('Expert 1',
		0,0,7,0,0,0,0,0,0,
		0,0,6,0,0,3,7,9,0,
		8,3,0,0,0,9,0,5,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,7,1,3,0,
		0,9,2,4,0,0,0,0,0,
		0,1,0,9,0,0,0,2,4,
		0,2,4,6,0,0,5,0,0,
		0,0,0,0,0,0,8,0,0
		),
		new Array('Expert 2',
		7,0,0,0,5,0,0,1,0,
		0,0,0,0,0,9,0,0,6,
		0,0,5,7,0,0,4,0,0,
		0,0,4,6,0,0,0,2,0,
		8,0,0,0,0,0,0,0,3,
		0,3,0,0,0,2,1,0,0,
		0,0,7,0,0,1,3,0,0,
		9,0,0,4,0,0,0,0,0,
		0,2,0,0,7,0,0,0,8
		),
		new Array('Expert 3',
		0,8,2,0,0,6,0,0,0,
		0,0,0,0,8,0,0,0,4,
		0,0,0,9,0,0,0,0,1,
		9,0,0,0,3,0,4,0,0,
		0,7,0,1,0,5,0,6,0,
		0,0,8,0,9,0,0,0,2,
		5,0,0,0,0,8,0,0,0,
		3,0,0,0,2,0,0,0,0,
		0,0,0,5,0,0,7,4,0
		),
		new Array('Empty ;D',
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0
		));
	
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
		
		//remove all banned (it is need when new level selected
		$('#game div').removeClass('banned');
		
		colorThem(t,selectedColorScheme,true);
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
	
	//Check if it is a win.
	function isWin(t)
	{
		//line
		var item	= 1;
		var lineSum	= 0;
		for(var i = 1;i<=81;i++)
		{
			if(item > 9)
			{
				item = 1;
				//1+2+3+4+5+6+7+8+9 if a line has other value than 45 it is fail
				if(lineSum != 45){
					return false;
				}
				else
				{				
					lineSum = 0;
				}
			
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
			if(columnSum != 45)
			{
				return false;
			}
			else
			{
				columnSum = 0;
			}
			
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
			
			if(blockSum != 45)
			{
				return false;
			}
			else
			{
				blockSum = 0;
			}
			
		}
		
		console.log('Win it is');
		return true;
	}
	
	function buildSelect(res,mode){
		var index = 0;
		
		if(mode == 'colors')index = 10
		
		for(var i=0;i<res.length;i++)
		{
			$("#"+mode).append('<option value="'+res.indexOf(res[i])+'">'+res[i][index]+'</option>')
		}
		
	}
	
	//Color selections
	function colorThem(t,selectedColorScheme,ini){
		line_pos	= 1
		column_pos	= 1;
		for(var i = 1;i<=81;i++)
		{
			//set position			
			if(column_pos > 9)
			{
				line_pos++;
				column_pos = 1;
			}
			
			/*THIS IS THE PLACE WHERE YOU DECIDE HOW IT LOOKS*/
			
			//set color
			$('#'+line_pos+'_'+column_pos).css('background',colors[selectedColorScheme][t[i]]);
			
			
			if(ini){
				//set css for banned ones
				if(t[i] != 0){
					$('#'+line_pos+'_'+column_pos).addClass('banned');
				}
			}
			column_pos++;
		}
		//Controls and setup for the published version
		for(var i = 0;i<10;i++)
		{
			$('#'+i).css('background',colors[selectedColorScheme][i]);
		}
	}
	//ini. returns a copy of the preset for furter use.
	function ini(t)
	{
		win = false;
		banned = banHammer(t);
		play = t.slice();
		fillTable(t);
	}
	
	/*the game*/
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
	
	/*bad solution for testing
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
		);*/
	
	/*good solution for testing
	var solution = new Array(1,
		1,6,3,4,5,9,8,2,7,
		4,2,8,3,7,1,5,6,9,
		7,9,5,8,2,6,1,4,3,
		5,4,2,7,6,8,3,9,1,
		3,1,6,5,9,2,4,7,8,
		8,7,9,1,4,3,2,5,6,
		9,3,7,2,1,5,6,8,4,
		6,5,1,9,8,4,7,3,2,
		2,8,4,6,3,7,9,1,5
		);*/
		
	/*almost solved for fast testing
	var solution2 = new Array(1,
		1,6,3,4,5,9,8,2,7,
		4,2,8,3,7,1,5,6,9,
		7,9,5,8,2,6,1,4,3,
		5,4,2,7,6,8,3,9,1,
		3,1,6,5,9,2,4,7,8,
		8,7,9,1,4,3,2,5,6,
		9,3,7,2,1,5,6,8,4,
		6,5,1,9,8,4,7,3,2,
		2,0,4,6,3,7,9,1,5
		);*/
	
	
	ini(levels[selectedLevel]);	
	
	if(localStorage.sudokuSave === undefined)
	{
		$('#loadIt').hide();
	}
	
	
	
	buildSelect(levels,'levels');
	buildSelect(colors,'colors');
	
	$("#win,.restart,#loadBtn,#saving,#saveIt,#saveTxt").hide();
	
	
	//Select level
	$("#levels").change(function(){
		selectedLevel = $(this).val();
		ini(levels[selectedLevel]);
	});
	
	//Select color
	$("#colors").change(function(){
		selectedColorScheme = $(this).val();
		colorThem(play,selectedColorScheme,false);
	});
	
	//Click on itme
	$("#game div").click(function(){
		var id = $(this).attr('id');
		var pos = getPos(play,id);
		
		
		if(banned.indexOf(pos) != -1 && !win)
		{
			//Move becouse it isn't a banned item
			play[pos] = parseInt(selectedNumber);
			
			$('#'+id).css('background',colors[selectedColorScheme][selectedNumber]);

			if(allFilled(play)){
				if(isWin(play)){
					win = true;
					
					var url = "https://twitter.com/intent/tweet?button_hashtag=sudoku&url=http://color-sudoku.nikhazy-dizajn.hu&related=Yzahkin&text=I%20just%20beat%20Color%20Sudoku's%20"+levels[selectedLevel][0]+"%20level%20with%20"+colors[selectedColorScheme][10]+"%20colors.";
					
					$("#twitter a").attr('href',url);
					$("#win").fadeIn(500);
					$(".restart").show();
				}
			}
		}
		
		
	});
	
	
	$("#editor div").ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			
			$(el).css('background',"#"+hex);
			$(el).ColorPickerHide();
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
	
	$("#tryIt").click(function(){
		var schemeName = window.prompt("Plase give a name for this scheme!","");
		var scheme = new Array;
		var editorColors = $("#editor div");
		
		for(var i = 0;i<10;i++)
		{
			scheme[i] = $("#"+editorColors[i].id).css('background');
		}
		if(schemeName == ""){schemeName = "Unnamed Scheme"}
		scheme[10] = schemeName;
		var lenght = colors.push(scheme)
		
		selectedColorScheme = lenght-1;
		colorThem(play,selectedColorScheme,false);
		$("#colors").html('');
		buildSelect(colors,'colors');
		$("#saveIt,#saveTxt").fadeIn(500);
	});
	
	$("#saveIt").click(function(){
		var r=confirm("This will save this color Scheme in your browser! This is a local save. If you want to share your colors save it as txt");
		if (r)
		{
			localStorage.sudokuSave = JSON.stringify(colors);
		}
		
	
	});
	
	$("#saveTxt").click(function(){
		
			$("#saveArea").val(JSON.stringify(colors));
			$("#saving").fadeIn(500);
			loadOrSave = 1;
		
	});
	
	$("#loadIt").click(function(){
			
			var html5docs = JSON.parse(localStorage.sudokuSave);
			console.log(html5docs)
			colors = html5docs;
			$("#colors").html('');
			buildSelect(colors,'colors');
			alert('Save loaded. Your color schemes are in the dropdown at the top');
	
	});
	
	$("#loadTxt").click(function(){
		$("#saveArea").val('');
		$("#saving").fadeIn(500);
		$("#loadBtn").fadeIn(500);
		loadOrSave = 0;
		
	});
	
	$("#loadBtn").click(function(){
		var text = $("#saveArea").val();
		console.log(text);
		var html5docs = JSON.parse(text);
		console.log(html5docs)
		colors = html5docs;
		$("#colors").html('');
		buildSelect(colors,'colors');
		$(this).parent().parent().hide();
		alert('Load Done');
	});
	
	$('#saveArea').mouseup(function(e) { return false; });
	$("#saveArea").focus(function(){
		if(loadOrSave){
			$(this).select();
		}
	})
	
	$("#close").click(function(){
		if(!loadOrSave){$("#loadBtn").hide();}
		$(this).parent().parent().hide();
	});
	
	$("#numbers div").click(function(){
		selectedNumber = $(this).attr('id');
		$("#numbers div").removeClass('selected');
		$(this).addClass('selected');
		
	})
	$("#win").click(function(){
		$(this).fadeOut(500);
	})
	$(".restart").click(function(){
		$(".restart").fadeOut(500);
		ini(levels[selectedLevel]);
	});
});	