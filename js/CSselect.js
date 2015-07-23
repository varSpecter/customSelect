;(function( $, window ){

	"use strict";

	function CSselect( el ){ 

		this.$el = $(el); 	

  		this.init();

	};

	CSselect.prototype.init = function(){

		//버튼 
		this.target = this.$el.find(".target");

		this.doc = $(document);

		this.initEvent();

	};

	CSselect.prototype.initEvent = function(){
		// CSselect
		var self = this;
		
		this.target.each(function( idx, el ){
			$(el).on("click" , function(){
				self.toggleSelect(idx);
			});
		});

		this.doc.on("click" , function(event){

			var event = event || window.event;

			if( !$(event.target || event.srcElement).is( self.target ) ){

				$( self.target ).removeClass("selection");	

			}; // if end

		}); // document click end

	};

	CSselect.prototype.toggleSelect = function( idx ){

		var target = this.target.eq(idx),
			csSelect = target.siblings(".cs-select");

		if( !csSelect.length ){

			var 
			obj = $("<ul></ul>").addClass("cs-select"),

			option = $("+ .exi-select option" , target).each(function( idx , optionEl ){

				obj.append( 
					$("<li></li>")
					.text( optionEl.text )
					.click(function(){ 

						target.text( this.outerText );
						option.removeAttr( "selected" ).eq( idx ).attr("selected" , "selected");

					})
				);

			});

			target.parent().append( obj );

		} // if end

		//토글
		this.target.removeClass("selection");	
		target.toggleClass("selection");	
			
	};

	window.CSselect = CSselect;

} ( window.jQuery , window ) );