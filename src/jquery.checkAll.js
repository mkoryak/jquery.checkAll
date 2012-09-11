/**
 * create a 'check all' checkbox. Pass in the child checkboxes that you want this 'check-all' checkbox to control
 * @param $childCheckboxes
 */
$.fn.checkAll = function($childCheckboxes){
	var $this = this; 
	var childCheckboxNum = $childCheckboxes.length;
    var $doc = $(document);
    var triggerChangeEvent = function(){
        $doc.trigger("check-all-change", [numChecked]);
    };
	
	var numChecked = $childCheckboxes.filter(":checkbox").unbind("click.checkAll").bind("click.checkAll", function(e){
		numChecked += $(this).is(":checked") ? 1 : -1;
		$this.attr("checked", (numChecked === childCheckboxNum));
        triggerChangeEvent();
	}).filter(":checked").length;
    
	$this.filter(":checkbox").unbind("click.checkAll").bind("click.checkAll", function(e){
		var checked = $(this).is(":checked");
        $childCheckboxes.attr("checked", checked);
		numChecked = checked ? childCheckboxNum : 0;
        triggerChangeEvent();
	});
    triggerChangeEvent();
	return this;
};