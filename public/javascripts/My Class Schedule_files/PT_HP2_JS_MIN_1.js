


var ptHP2BaseURI = getptBaseURI();var sFormName = "";var ptHP2 = {
 isHomepage : /\/h\/\?tab=/.test(location),
 sortableClass : "ptpgltsortable",
 frozenClass : "ptpgltfixed",
 scrollTimer : null,
 scrollStartTime : 0,
 winStartWidth : 0,
 docStartWidth : 0, 
 init : function () {

 if (!ptHP2.isHomepage) {return;}

 
 if (ptUtil.id("pttabperlayout")) {
 ptHP2.winStartWidth = ptHP2.getWinWidth(); ptHP2.docStartWidth = document.body.scrollWidth; ptHP2.addEvents(); ptHP2.initDragDrop(); }
 },

 addEvents : function () {
 ptEvent.add(window,"resize",function () { setInterval(ptHP2.checkResize,100); }); },

 getWinWidth : function () {

 de = document.documentElement; return window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth; },

 checkResize : function () {

 var currWinWidth = ptHP2.getWinWidth(); var currDocWidth = document.body.scrollWidth;    if ((currWinWidth !== ptHP2.winStartWidth) || (currDocWidth !== ptHP2.docStartWidth)) {
 ptHP2.docStartWidth = currDocWidth;  ptHP2.winStartWidth = currWinWidth; ptHP2.resetPgltConstraints(); }
 },

 
 resetPgltConstraints : function () {

 var colIds = ["ptcol1", "ptcol2", "ptcol3"]; var colNode; var pglts; var i,j,k; var pgltConstraints = ptHP2.getHPConstraints(); for (i = 0; i < 3; i++) {
 colNode = ptUtil.id(colIds[i]); if (colNode) {
 
 pglts = ptUtil.getElemsByClass(ptHP2.sortableClass,colNode,"li"); for (j = 0, k = pglts.length; j < k; j++) {
 pglts[j].setConstraints(pgltConstraints); }
 }
 }
 },

 initDragDrop : function () {

 var colIds = ["ptcol1", "ptcol2", "ptcol3"]; var handleClass = "ptpgltlabel"; var colNode; var pglts; var i,j,k; var pgltConstraints = ptHP2.getHPConstraints(); for (i = 0; i < 3; i++) {

 colNode = ptUtil.id(colIds[i]); if (colNode) {

 
 ptDrop.add(colNode,{
 acceptClass : ptHP2.sortableClass,
 onDragOver : function (dragEl) { },

 onDragOut : function (dragEl) { 
 this.style.backgroundColor = "";  },

 
 frozenClass : ptHP2.frozenClass
 });  pglts = ptUtil.getElemsByClass(ptHP2.sortableClass,colNode,"li"); for (j = 0, k = pglts.length; j < k; j++) {

 ptDrag.add(pglts[j],{
 handle : handleClass, 
  dragClass : ptHP2.sortableClass,
  constraint : pgltConstraints,
  ondragstart : ptHP2.scrollStart,
 ondragstop : ptHP2.scrollEnd,
 onChange : function () {

 
 
 var addPglt = ptUtil.id(this.parentNode.id + "addpglt"); if (addPglt && !ptHP2.isAddPgltLast(addPglt)) {
 this.parentNode.appendChild(addPglt);  this.initNextItem = this.currNextItem = addPglt; return; }

 var tabName = ptHP2.getQParam('tab'); var isRemoteDashboard = false; if (tabName) {
 if(tabName == "REMOTEUNIFIEDDASHBOARD")
 {
 isRemoteDashboard = true; remotedburl = ptHP2.getQParam("remotedburl"); if(remotedburl)
 {
 remotedburl = decodeURIComponent(remotedburl); var pos = remotedburl.indexOf("?tab"); var remotetabname = ptHP2.getQParam('tab',remotedburl); tabName = "?tab=" + remotetabname; var linkId = ptHP2.getQParam("pslnkid", remotedburl); if (linkId) {
 linkId = "&pslnkid=" + linkId; } else {
 linkId = ""; }
 }
 }
 else
 {
 
 tabName = "?tab=" + tabName;  var linkId = ptHP2.getQParam("pslnkid"); if (linkId) {
 linkId = "&pslnkid=" + linkId; } else {
 linkId = ""; }
 }

 
 
 var pgltId = "&pgltname=" + this.id.slice(9);  var pgltRow = "&row=" + ptHP2.getRow(this);   var pgltCol = "&col=" + this.parentNode.id.charAt(5);  if(isRemoteDashboard)
 {
 remotedburl = remotedburl.split("\/"); var ptBaseURI = ""; var nPos = String(location).indexOf('\/psp\/'); if (nPos != -1)
 {
 ptBaseURI = String(location).substr(nPos,String(location).length); var addressLoc = String(ptBaseURI).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc)
 { var localnode = "/" + addressLoc[4] + "/" ; var remotenode = "/" + remotedburl[6] + "/"; ptBaseURI = addressLoc[0].replace(localnode,remotenode); }
 else 
 ptBaseURI = ""; }
 else 
 ptBaseURI = String(location).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; ptBaseURI = getContextRoot(String(location)) + ptBaseURI; var serviceURI = ptBaseURI + "s/WEBLIB_PORTAL.PORTAL_HOMEPAGE.FieldFormula.IScript_PT_HomepageDND"; var ajaxUrl = serviceURI + tabName + linkId + pgltId + pgltRow + pgltCol + "&cmd=SMARTNAV"; }
 else
 {
 var serviceURI = ptHP2BaseURI + "s/WEBLIB_PORTAL.PORTAL_HOMEPAGE.FieldFormula.IScript_PT_HomepageDND"; var ajaxUrl = serviceURI + tabName + linkId + pgltId + pgltRow + pgltCol; }
 var loader = new net2.ContentLoader(ajaxUrl,null,null,"GET",
 function () {
 
 var refreshURL = this.req.responseText;  if (ptHPRefresh) {
 setRefreshPage(ptHPRefresh.cookie,ptHPRefresh.tabQS,ptHPRefresh.domain); }

 
 if (refreshURL) { document.location.href = refreshURL; }
   },null,null,"application/x-www-form-urlencoded"); loader = null; }
 }
 }); } 

 
 
 
 pglts = ptUtil.getElemsByClass(ptHP2.frozenClass,colNode,"li"); for (j = 0, k = pglts.length; j < k; j++) {
 if (browserInfoObj2.isIE) { pglts[j].style.zoom = 1; }
 }
 } 
 } 
 },

 
 getHPConstraints : function () {
 var boundry = []; var minEl; var maxEl; var offset; minEl = ptUtil.id("ptcol1"); maxEl = ptUtil.id("ptcol3") || ptUtil.id("ptcol2"); if (minEl && maxEl) {

 
 offset = coords.topLeftOffset(minEl,true); boundry.push(offset.x); boundry.push(offset.y);  offset = coords.topLeftOffset(maxEl,true);  if ((maxEl.offsetWidth > ptDragUtils.getScroll().w) && ("ltr" != "rtl"))
 boundry.push(ptDragUtils.getScroll().iw);  else
 boundry.push(offset.x);  maxEl = ptUtil.id("ptpglts"); if (maxEl) {
 offset = coords.bottRightOffset(maxEl,true); boundry.push(offset.y); }

 offset = null; }
 return boundry; },

 scrollStart : function () {
  ptHP2.scrollTimer = setInterval(ptHP2.scrollSome, 100); ptHP2.scrollStartTime = (new Date()).getTime(); },

 scrollEnd : function () {
 clearInterval(ptHP2.scrollTimer); ptHP2.scrollTimer = null; },

 scrollSome : function () {

 var t = (new Date()).getTime(); if (t > ptHP2.scrollStartTime) {
 
 clearInterval(ptHP2.scrollTimer); ptHP2.scrollTimer = null; ptHP2.scrollStart(); }

 if (ptDrag.isDragging) {
 ptHP2.scrollY();  if ("ltr" != "rtl")
 ptHP2.scrollX(); }
 },

 
 scrollX : function(){
 var scrollLeft = ptDragUtils.getScrollLeft();   var scrollTop = ptDragUtils.getScrollTop();  var xLeft = ptHP2.findLeftX(ptDrag.group); var xBottom = ptDrag.group.width + xLeft; var tlPos; var deltaX; var xLeftPos = xLeft + ptDrag.group.offsetWidth;  if ((xLeftPos > scrollLeft + ptDrag.scrollInnerWidth) && 
 (xLeftPos < ptDragUtils.getScroll().iw + xLeftPos) && (ptDrag.group.mouseMax.x > 0)) { 
 deltaX = xLeft + ptDrag.group.offsetWidth - (scrollLeft + ptDrag.scrollInnerWidth);  ptDrag.group.mouseMax.x = ptDrag.group.mouseMax.x - deltaX; ptDrag.group.mouseMin.x = ptDrag.group.mouseMin.x - deltaX; tlPos = coords.topLeftPos(ptDrag.group); tlPos = tlPos.plus( {x:deltaX, y:0} ); tlPos.reposition(ptDrag.group); window.scrollTo(scrollLeft + deltaX,scrollTop);  } else if (xLeftPos < scrollLeft + ptDrag.group.offsetWidth && xLeftPos >= ptDrag.group.minX) {
 deltaX = scrollLeft + 20 - xLeft;  ptDrag.group.mouseMin.x = ptDrag.group.mouseMin.x + deltaX; ptDrag.group.mouseMax.x = ptDrag.group.mouseMax.x + deltaX;  tlPos = coords.topLeftPos(ptDrag.group); tlPos = tlPos.plus( {x:-deltaX, y:0} ); tlPos.reposition(ptDrag.group);  window.scrollTo(scrollLeft-deltaX,scrollTop); }
 },

 
 scrollY : function(){
 var scrollLeft = ptDragUtils.getScrollLeft();   var scrollTop = ptDragUtils.getScrollTop();  var yTop = ptHP2.findTopY(ptDrag.group); var yBottom = ptDrag.group.height + yTop; var tlPos; var deltaY;  if ((yTop + 30 > scrollTop + ptDrag.scrollInnerHeight) && 
 (yTop + 30 < ptDragUtils.getScroll().h) && (ptDrag.group.mouseMax.y > 0)) { 
 deltaY = yTop + 30 - (scrollTop + ptDrag.scrollInnerHeight);  ptDrag.group.mouseMax.y = ptDrag.group.mouseMax.y - deltaY; ptDrag.group.mouseMin.y = ptDrag.group.mouseMin.y - deltaY; tlPos = coords.topLeftPos(ptDrag.group); tlPos = tlPos.plus( {x:0, y:deltaY} ); tlPos.reposition(ptDrag.group); window.scrollTo(scrollLeft,scrollTop + deltaY);  } else if (yTop < scrollTop + 20 && yTop >= ptDrag.group.minY) {
 deltaY = scrollTop + 20 - yTop;  ptDrag.group.mouseMin.y = ptDrag.group.mouseMin.y + deltaY; ptDrag.group.mouseMax.y = ptDrag.group.mouseMax.y + deltaY;  tlPos = coords.topLeftPos(ptDrag.group); tlPos = tlPos.plus( {x:0, y:-deltaY} ); tlPos.reposition(ptDrag.group);  window.scrollTo(scrollLeft,scrollTop - deltaY); }
 },

 findLeftX : function (obj) {
 var curleft = 0; if (obj.offsetParent) {
 while (obj.offsetParent) {
 curleft += obj.offsetLeft; obj = obj.offsetParent; }
 } else if (obj.x) {
  curleft += obj.x; }
 return curleft; },

 findTopY : function (obj) {
 var curtop = 0; if (obj.offsetParent) {
 while (obj.offsetParent) {
 curtop += obj.offsetTop; obj = obj.offsetParent; }
 } else if (obj.y) {
  curtop += obj.y; }
 return curtop; },

 
 getQParam : function (q,u) {

  if (typeof u == 'undefined') {
 var qry = location.search.substring(1).split('&'); } else {
 var qp = String(u).match(/\?(.*)/); if (qp) {
 var qry = qp[1].split('&'); } else {
 return; }
 }

 while (s = qry.shift()) {
 var v = s.split('='); if (v[0] == q) {
 return v[1]; }
 }
 },

 getRow : function (sortablePglt) {

 
 var pglts = ptUtil.getElemsByClass("pthpli",sortablePglt.parentNode,"li"); var row = 1; for (var i = 0; i < pglts.length; i++) {
 if (pglts[i].id === sortablePglt.id) {
 return row; }
 row++; }
 },

 
 isAddPgltLast : function (item) {
 
 var sibling = item.nextSibling; while (sibling) {
 if (sibling.nodeName === item.nodeName && 
 ptUtil.isClassMember(sibling,ptHP2.sortableClass)) {
 return false; }
 sibling = sibling.nextSibling; }
 return true; }
}; ptEvent.load(ptHP2.init);var coords = {
 ORIGIN : new Coord(0, 0),

 topLeftPos : function (element) {
 var x = parseInt(element.style.left); var y = parseInt(element.style.top); return new Coord(isNaN(x) ? 0 : x, isNaN(y) ? 0 : y); },

 bottRightPos : function (element) {
 return coords.topLeftPos(element).plus(
 new Coord(element.offsetWidth, element.offsetHeight)); },

 topLeftOffset : function (element, isRecursive) {
 var offset = new Coord(element.offsetLeft, element.offsetTop); if (!isRecursive) { return offset; }

 var parent = element.offsetParent; while (parent) {
 offset = offset.plus(new Coord(parent.offsetLeft, parent.offsetTop)); parent = parent.offsetParent; }
 return offset; },

 topRightOffset : function (element, isRecursive) {
 var tr = coords.topLeftOffset(element, isRecursive); return new Coord(tr.x + element.offsetWidth, tr.y); },

 bottRightOffset : function (element, isRecursive) {
 return coords.topLeftOffset(element, isRecursive).plus(
 new Coord(element.offsetWidth, element.offsetHeight)); },

 fixEvent : function (event) {
 event.windowCoordinate = new Coord(event.clientX, event.clientY); }
}; function Coord(x, y) {
 this.x = x; this.y = y;}
Coord.prototype.toString = function () {
 return "(" + this.x + "," + this.y + ")";}
Coord.prototype.plus = function (that) {
 return new Coord(this.x + that.x, this.y + that.y);}
Coord.prototype.minus = function (that) {
 return new Coord(this.x - that.x, this.y - that.y);}
Coord.prototype.distance = function (that) {
 var deltaX = this.x - that.x; var deltaY = this.y - that.y; return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));}
Coord.prototype.max = function (that) {
 var x = Math.max(this.x, that.x); var y = Math.max(this.y, that.y); return new Coord(x, y);}
Coord.prototype.constrain = function (min, max) {
 if (min.x > max.x || min.y > max.y) { return this; }
 var x = this.x; var y = this.y; if (min.x != null) x = Math.max(x, min.x); if (max.x != null) x = Math.min(x, max.x); if (min.y != null) y = Math.max(y, min.y); if (max.y != null) y = Math.min(y, max.y); return new Coord(x, y);}
Coord.prototype.reposition = function (element) {
 if (!isNaN(this.y)) 
 element.style["top"] = this.y + "px"; if (!isNaN(this.x))
 element.style["left"] = this.x + "px";}
Coord.prototype.equals = function (that) {
 if (this == that) {
 return true; }
 if (!that || that == null) {
 return false; }
 return this.x == that.x && this.y == that.y;}

Coord.prototype.isInside = function (topLeft, bottomRight) {
 if ((this.x >= topLeft.x) && (this.x <= bottomRight.x) &&
 (this.y >= topLeft.y) && (this.y <= bottomRight.y)) {
 return true; }
 return false;}



var ptDragUtils = {

 
 swap : function (item1, item2) {
 var parent = item1.parentNode; parent.removeChild(item1); parent.insertBefore(item1, item2); item1.style["top"] = "0px"; item1.style["left"] = "0px"; },

 nextItem : function (item) {
 var sibling = item.nextSibling; while (sibling != null) {
 if (sibling.nodeName == item.nodeName) {
 return sibling; }
 sibling = sibling.nextSibling; }
 return null; },

 previousItem : function (item) {
 var sibling = item.previousSibling; while (sibling != null) {
 if (sibling.nodeName == item.nodeName) {
 return sibling; }
 sibling = sibling.previousSibling; }
 return null; },

 getScroll : function () {

 var t = 0, l = 0, w = 0, h = 0, iw = 0, ih = 0; var de = document.documentElement; if (de) {
 t = de.scrollTop; l = de.scrollLeft; w = de.scrollWidth;  if (!browserInfoObj2.isIE || document.compatMode == "CSS1Compat") 
 h = de.scrollHeight; else 
 h = document.body.scrollHeight; } else if (document.body) {
 var db = document.body; t = db.scrollTop; l = db.scrollLeft; w = db.scrollWidth; h = db.scrollHeight; }
 iw = self.innerWidth || de.clientWidth || document.body.clientWidth || 0; ih = self.innerHeight || de.clientHeight || document.body.clientHeight || 0; return { t: t, l: l, w: w, h: h, iw: iw, ih: ih }; },

 getScrollLeft : function () {
 
 
 return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0; },

 getScrollTop : function () {
 
 
 return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0; },

 isMoveable : function (el) {
 if (el && !el.parentNode.frozenClass) { return true; }
 return el && !ptUtil.isClassMember(el,el.parentNode.frozenClass); }
}; var ptDrag = {
 BIG_Z_INDEX : 10000,
 group : null,
 isDragging : false,
 isDebug : false,
 scrollInnerHeight : 0,
 scrollInnerWidth : 0, 
 isMinimized : false, 

 
 add : function (group,config) {

 
 if (browserInfoObj2.isIE) { group.style.zoom = 1; }

 
 var handle = config.handle || null; if (handle) {
 
 handle = ptUtil.getElemsByClass(handle,group)[0]; }

 group.handle = handle || group; group.handle.group = group;  group.dragClass = config.dragClass;   group.threshold = isNaN(parseInt(config.threshold)) ? 5 : config.threshold; group.thresholdX = 0; group.thresholdY = 0; group.minX = null;  group.maxX = null;  group.minY = null; group.maxY = null; group.setConstraints = ptDrag.setConstraints;  if (config.constraint) {
 group.setConstraints(config.constraint); }

 
 group.ondragstart = config.ondragstart || function () {}; group.ondragstop = config.ondragstop || function () {}; group.onChange = config.onChange || function () {};  group.onDragStart = ptDrop.onDragStart; group.onDrag = ptDrop.onDrag; group.onDragEnd = ptDrop.onDragEnd; group.isOutside = false; group.height = coords.bottRightPos(group).y;  group.initNextItem = group.currNextItem = ptDragUtils.nextItem(group); group.constrain = ptDrag.constrain;   if (typeof handle !== "undefined") {
 ptEvent.add(group.handle,"mousedown",ptDrag.onMouseDown); }
 },

 constrainVertical : function () {
 var tlOffset = coords.topLeftOffset(this, true); this.minX = tlOffset.x; this.maxX = tlOffset.x; },

 constrainHorizontal : function () {
 var tlOffset = coords.topLeftOffset(this, true); this.minY = tlOffset.y; this.maxY = tlOffset.y; },

 constrain : function (tlPos, brPos) {
 this.minX = tlPos.x; this.minY = tlPos.y; this.maxX = brPos.x; this.maxY = brPos.y; },

 setDragHandle : function (handle) {
 if (handle && handle != null)
 this.handle = handle; else
 this.handle = this; this.handle.group = this; this.onmousedown = null; this.handle.onmousedown = this.onMouseDown; },

 setDragThreshold : function (threshold) {
 if (isNaN(parseInt(threshold))) { return; }
 this.threshold = threshold; },

 setDragThresholdX : function (threshold) {
 if (isNaN(parseInt(threshold))) { return; }
 this.thresholdX = threshold; },

 setDragThresholdY : function (threshold) {
 if (isNaN(parseInt(threshold))) { return; }
 this.thresholdY = threshold; },

 
 setConstraints : function (constraints) {

 if (constraints.constructor == String) {
 var constraintObj = ptUtil.id(constraints); if (constraintObj) {
 var tlOffset = coords.topLeftOffset(constraintObj, true); var brOffset = coords.bottRightOffset(constraintObj, true); this.minX = tlOffset.x;  this.minY = tlOffset.y; this.maxX = brOffset.x; this.maxY = brOffset.y; }
 } else if (constraints.constructor == Array && 
 constraints.length == 4) {
 this.minX = parseInt(constraints[0]) || 0; this.minY = parseInt(constraints[1]) || 0; this.maxX = parseInt(constraints[2]) || 0; this.maxY = parseInt(constraints[3]) || 0; }
 }, 

 
 
 onMouseDown : function (event) {

 event = ptDrag.fixEvent(event); ptDrag.group = this.group; var group = this.group; var mouse = event.windowCoordinate; var isRTLMode = ("ltr" === "rtl");  var minContainerWidth = 0; var container;   for (var i = 0; i < ptDrop.dropCount; i++) {
 container = ptDrop.dObjs[i];   if (((minContainerWidth <= 0) || (container.offsetWidth < minContainerWidth)) 
 && (container.offsetWidth > 4)){
 minContainerWidth = container.offsetWidth; }
 }

 if (isRTLMode) {
 var outerWinWidth = browserInfoObj2.isIE ? ptDragUtils.getScroll().w : ptDragUtils.getScroll().iw;   var innerWinWidth = browserInfoObj2.isIE ? ptDragUtils.getScroll().iw : document.body.clientWidth; }

 var preMouseX = (!isRTLMode) ? (event.clientX + document.body.scrollLeft) : (outerWinWidth - event.clientX); var preMouseY = event.clientY + document.body.scrollTop;  var PretlPos = coords.topLeftPos(group); ptDrag.isMinimized = isPgltMinimized(group.id.slice(9));  ptDrag.pgltMinMax(group.id.slice(9), 1);  group.style.width = minContainerWidth + "px"; var tlOffset = coords.topLeftOffset(group, true); var tlPos = coords.topLeftPos(group); var brPos = coords.bottRightPos(group); var brOffset = coords.bottRightOffset(group, true); var sOffset = ptDragUtils.getScrollTop(); var nowMouseX = (!isRTLMode) ? (event.clientX + document.body.scrollLeft) : (outerWinWidth - event.clientX);  var nowMouseY = event.clientY + document.body.scrollTop;  var scrollDistance = (!isRTLMode || !browserInfoObj2.isIE) ? 0 : (document.body.scrollWidth - document.body.clientWidth - document.body.scrollLeft); var XPos = tlOffset.x;  if (isRTLMode){
 if (browserInfoObj2.isIE)
 XPos = (innerWinWidth - XPos - group.offsetWidth); else
 XPos = (innerWinWidth - XPos - group.offsetWidth) + ptDragUtils.getScrollLeft(); }

 var YPos = tlOffset.y

 
 
 if ((nowMouseX > (XPos + minContainerWidth - 40)) || ((XPos - scrollDistance) > nowMouseX)) {
 if (!isRTLMode)
 group.style.left = (nowMouseX - XPos - (minContainerWidth/2)) + "px"; else 
  group.style.left = (0-(nowMouseX - XPos - (minContainerWidth/2)) - scrollDistance)+ "px"; } 
 
 
 if (preMouseY != nowMouseY) 
  group.style.top = (nowMouseY - preMouseY) +"px";  var scroll = ptDragUtils.getScroll(); ptDrag.scrollInnerHeight = scroll.ih; ptDrag.scrollInnerWidth = scroll.iw;  group.originalOpacity = group.style.opacity; group.originalZIndex = group.style.zIndex; group.originalFilter = group.style.filter;  group.initialWindowCoordinate = mouse; group.originalCursor = ptUtil.getCSSValue(group.handle,"cursor");  group.dragCoordinate = mouse; ptDrag.showStatus(mouse, tlPos, brPos, tlOffset, brOffset, scroll); group.onDragStart(tlPos, brPos, tlOffset, brOffset); var NewtlPos = coords.topLeftPos(group) ; if (group.minX != null) 
 group.minMouseX = (mouse.x - tlPos.x + group.minX - tlOffset.x) - (NewtlPos.x - PretlPos.x); if (group.maxX != null)
 group.maxMouseX = group.minMouseX + group.maxX - group.minX; if (group.minY != null)
 group.minMouseY = mouse.y - tlPos.y + group.minY - tlOffset.y; if (group.maxY != null)
  group.maxMouseY = ptDragUtils.getScroll().h;  group.mouseMin = new Coord(group.minMouseX, group.minMouseY); group.mouseMax = new Coord(group.maxMouseX, group.maxMouseY); ptEvent.add(document,"mousemove",ptDrag.onMouseMove); ptEvent.add(document,"mouseup",ptDrag.onMouseUp); ptEvent.add(document,"mouseout",ptDrag.onMouseOut);    if (document.body.setCapture) {
 document.body.setCapture(); document.body.style.cursor = "move"; }

 group.style.zIndex = ptDrag.BIG_Z_INDEX;  return false; },

 
 pgltMinMax : function (name, min) {
 if (ptDrag.isMinimized)
 return;  var pgltBody = document.getElementById('ptpgltbody_row_' + name);    var i=0; var chNode;  var cellBody = pgltBody.cells[0];  var hasBodyData = false;   if (cellBody) 
  for (i=0; i<cellBody.childNodes.length; i++) {
  chNode = cellBody.childNodes[i].nodeName;  if (chNode == "DIV") {
  hasBodyData = true;  break;  }
  }

  if (min) { 
  if (hasBodyData){
  cellBody.childNodes[i].style.display = 'none';  var pgltThisBody = returnPgltBody(name); if (pgltThisBody != null && pgltThisBody.firstChild != null && pgltThisBody.firstChild.children != null)
 {
 for (i=0; i<pgltThisBody.firstChild.children.length; i++) {
 if (pgltThisBody.firstChild.children[i]!= null && pgltThisBody.firstChild.children[i].tagName == "FORM")
 {
 sFormName = pgltThisBody.firstChild.children[i].name; break; }
 }
 }
  pgltThisBody.style.height = "";  }
  toggleMaxIcon(name, 'block');   }
  else { 
  if (hasBodyData) {
  cellBody.childNodes[i].style.display = '';  toggleMaxIcon(name, 'none');  }
  else {
  var pgltBody = returnPgltBody(name);  pgltBody.innerHTML = "<div class='ptprtlcontainer'><br /><br /><br /><br /></div>";  } 
  }
 ptHP2.checkResize();  },

 
 showStatus : function (mouse, tlPos, brPos, tlOffset, brOffset, s) {
 if (ptDrag.isDebug) {
 window.status =
 "mouse: " + mouse.toString() + " " +
 "TL pos: " + tlPos.toString() + " " +
 "BR pos: " + brPos.toString() + " " +
 "TL offset: " + tlOffset.toString() + " " +
 "BR offset: " + brOffset.toString() + " " +
 "scrollTop: " + "(" + ptDragUtils.getScrollTop() + ")" + " " +
 "scrollH: " + "(" + s.h + ")" + " " +
 "scrollIH: " + "(" + s.ih + ")" + " " +
 "scrollCH: " + "(" + (s.h > s.ih ? (s.h - s.ih) : s.h) + ")"; }
 },

 
 onMouseMove : function (event) {

 event = ptDrag.fixEvent(event); var group = ptDrag.group; var mouse = event.windowCoordinate; var tlOffset = coords.topLeftOffset(group, true); var tlPos = coords.topLeftPos(group); var brPos = coords.bottRightPos(group); var brOffset = coords.bottRightOffset(group, true); var trOffset = coords.topRightOffset(group, true); ptDrag.showStatus(mouse, tlPos, brPos, tlOffset, brOffset, scroll); if (!ptDrag.isDragging) {
 if (group.threshold > 0) {
 var distance = group.initialWindowCoordinate.distance(mouse); if (distance < group.threshold) {
 return true; }
 } else if (group.thresholdY > 0) {
 var deltaY = Math.abs(group.initialWindowCoordinate.y - mouse.y); if (deltaY < group.thresholdY) {
 return true; }
 } else if (group.thresholdX > 0) {
 var deltaX = Math.abs(group.initialWindowCoordinate.x - mouse.x); if (deltaX < group.thresholdX) {
 return true; }
 }

 ptDrag.isDragging = true; group.style["zIndex"] = ptDrag.BIG_Z_INDEX; group.style["opacity"] = 0.75;  group.style.filter = "alpha(opacity=75)";   group.handle.style.cursor = "move"; }

 var adjusted = mouse.constrain(group.mouseMin, group.mouseMax); tlPos = tlPos.plus(adjusted.minus(group.dragCoordinate)); tlPos.reposition(group); group.dragCoordinate = adjusted;     var offsetBefore = coords.topLeftOffset(group, true); group.onDrag(tlPos, brPos, tlOffset, brOffset, trOffset);  var offsetAfter = coords.topLeftOffset(group, true); if (!offsetBefore.equals(offsetAfter)) {
 var errorDelta = offsetBefore.minus(offsetAfter); tlPos = coords.topLeftPos(group).plus(errorDelta); tlPos.reposition(group); }
 return false; },

 
 
 onMouseUp : function (event) {

 event = ptDrag.fixEvent(event); var group = ptDrag.group;  if (typeof dateBoxOpen != "undefined" && dateBoxOpen)
 closeCal2(); var mouse = event.windowCoordinate; var tlOffset = coords.topLeftOffset(group, true); var tlPos = coords.topLeftPos(group); var brPos = coords.bottRightPos(group); var brOffset = coords.bottRightOffset(group, true); ptEvent.remove(document,"mousemove",ptDrag.onMouseMove); ptEvent.remove(document,"mouseup",ptDrag.onMouseUp); ptEvent.remove(document,"mouseout",ptDrag.onMouseOut);  if (document.body.releaseCapture) {
 document.body.releaseCapture();  document.body.style.cursor = "auto"; }

 
 group.style.width = ""; ptDrag.pgltMinMax(group.id.slice(9), 0);  group.onDragEnd(tlPos, brPos, tlOffset, brOffset);  group.style["zIndex"] = group.originalZIndex; group.style["opacity"] = group.originalOpacity;  group.style.filter = group.originalFilter;  group.handle.style.cursor = group.originalCursor;  ptDrag.group = null; ptDrag.isDragging = false; return false; },

 
 
 
 
 
 
 onMouseOut : function(event) {
 var tgt = event.toElement || event.relatedTarget; if (!tgt) { ptDrag.onMouseUp(event); }
 },

 fixEvent : function (event) {
 if (typeof event == 'undefined') { event = window.event; }
 coords.fixEvent(event); return event; }
}; var ptDrop = {
 currContainer : null,
 dObjs : [],
 dropCount : 0,
 spot : null, 
 numSpot : 0, 
 finalContainerId : null, 

 
 add : function (dropObj,config) {

 if (!dropObj || !config.acceptClass) { return; }

 dropObj.acceptClass = config.acceptClass;  dropObj.onDragOver = config.onDragOver || 
 function () { this.style.backgroundColor = "#ffffcc"; };  dropObj.onDragOut = config.onDragOut || 
 function () { this.style.backgroundColor = "#ffffff"; };   dropObj.frozenClass = config.frozenClass || false; this.dObjs.push(dropObj); this.dropCount = this.dObjs.length;  if (browserInfoObj2.isIE) { dropObj.style.zoom = 1; }
 },

 
 createSpot : function(hsize, wsize) {
 if (this.numSpot > 0) {
 
 if (this.spot)
 this.spot.style.width = wsize + "px"; return;  }

 ptDrop.clearSpot(); this.spot = document.createElement('div'); this.spot.id = 'emptySpot'; this.spot.className = 'ptDropSpot'; if (hsize > 0) this.spot.style.height = hsize + 'px'; this.spot.style.width = wsize + 'px'; this.numSpot += 1; },

 
 clearSpot : function() {
 if ((this.numSpot > 0) && (this.spot.parentNode)){
 this.spot.parentNode.removeChild(this.spot); this.numSpot = 0; }
 },

 
 
 onDragStart : function (tlPos, brPos, tlOffset, brOffset) {
 var container;    for (var i = 0; i < ptDrop.dropCount; i++) {
 container = ptDrop.dObjs[i]; container.topLeft = coords.topLeftOffset(container,true); container.topLeft.y -= 100;  container.bottomRight = coords.bottRightOffset(container,true); container.bottomRight.y = document.body.scrollHeight + 100;  container.brPos = coords.bottRightPos(container);  }

 this.originalWidth = brPos.x;    ptDrop.currContainer = this.parentNode;  this.ondragstart(); },

 
 
 onDrag : function (tlPos, brPos, tlOffset, brOffset, trOffset) {

 var isTLInParent, isTRInParent, isHFTLInParent;  var isTLInside, isTRInside, isHFTLInside;   var hftlOffset = new Coord(tlOffset.x + (this.offsetWidth*0.50), tlOffset.y) ;    isTLInParent = tlOffset.isInside(ptDrop.currContainer.topLeft, ptDrop.currContainer.bottomRight); isTRInParent = trOffset.isInside(ptDrop.currContainer.topLeft, ptDrop.currContainer.bottomRight); isHFTLInParent = hftlOffset.isInside(ptDrop.currContainer.topLeft, ptDrop.currContainer.bottomRight);  if (this.isOutside) {

 
 var container; for (var i = 0; i < ptDrop.dropCount; i++) {
 container = ptDrop.dObjs[i]; isTLInside = tlOffset.isInside(container.topLeft, container.bottomRight); isTRInside = trOffset.isInside(container.topLeft, container.bottomRight); isHFTLInside = hftlOffset.isInside(container.topLeft, container.bottomRight); if ((isTLInside || (isTRInside && isHFTLInside)) 
 && this.dragClass === container.acceptClass) {
 
 container.onDragOver(this); this.isOutside = false;    var tempParent = this.parentNode; tempParent.removeChild(this); container.appendChild(this); tempParent.parentNode.removeChild(tempParent); break; }
 }

 
 if (this.isOutside) { return; }

 } else if (!isTLInParent || !isTRInParent ) {

 this.isOutside = true;  var container; for (var i = 0; i < ptDrop.dropCount; i++) {
 container = ptDrop.dObjs[i]; isTLInside = tlOffset.isInside(container.topLeft, container.bottomRight); isTRInside = trOffset.isInside(container.topLeft, container.bottomRight); isHFTLInside = hftlOffset.isInside(container.topLeft, container.bottomRight); if ( ((isTLInside && isHFTLInside) || (isTRInside && isHFTLInside) ) && 
 (this.dragClass === container.acceptClass)) {
 
 this.isOutside = false; this.parentNode.removeChild(this); container.appendChild(this); break; }
 }

 
 
 if (this.isOutside) {
 ptDrop.clearSpot(); var tempParent = this.parentNode.cloneNode(false); this.parentNode.removeChild(this); tempParent.appendChild(this); document.getElementsByTagName("body").item(0).appendChild(tempParent); tempParent.style.cursor = "move";  return; }
 }

 
 
 
 if (ptDrop.currContainer == this.parentNode) {
 ptDrop.currContainer.onDragOver(this); this.isOutside = false; this.parentNode.removeChild(this); ptDrop.currContainer.appendChild(this); }

 if (!ptDragUtils.previousItem(this))
 ptDrop.swapNext(this, this.offsetHeight, this.parentNode.offsetWidth);  else 
 ptDrop.swapPrev(this, this.offsetHeight, this.parentNode.offsetWidth);  },

 
 
 swapPrev : function (thisElem, h, w) {
 var parentHeight = thisElem.parentNode.offsetHeight - (h*2); var item = thisElem; var previous = ptDragUtils.previousItem(item); var prevDiff = 0;  while (previous && ptDragUtils.isMoveable(previous) &&
 (thisElem.offsetTop <= previous.offsetTop)){
 item = previous; previous = ptDragUtils.previousItem(item); }

  if (thisElem != item) {
 if (thisElem.offsetTop <= item.offsetTop) {
 ptDrop.createSpot(h, w); item.parentNode.insertBefore(ptDrop.spot, item);  ptDragUtils.swap(ptDrop.spot,item);  }else if (ptDragUtils.nextItem(thisElem) ) {
 ptDrop.createSpot(h, w); item.parentNode.insertBefore(ptDrop.spot, item); ptDragUtils.swap(item, ptDrop.spot);  } 

 } 
 else if (previous){
 
 ptDrop.createSpot(h, w); previous.parentNode.insertBefore(ptDrop.spot, previous);  ptDragUtils.swap(ptDrop.spot,previous);  }
 },

 
 swapNext : function (thisElem, h, w) {
 var parentHeight = thisElem.parentNode.offsetHeight - (h*2);  var item = thisElem; var next = ptDragUtils.nextItem(item);  while (next && ptDragUtils.isMoveable(next) && 
 (thisElem.offsetTop) >= next.offsetTop - 2) {
 item = next; next = ptDragUtils.nextItem(item); }

 if (thisElem != item) {
 ptDrop.createSpot(h, w); item.parentNode.insertBefore(ptDrop.spot, item); ptDragUtils.swap(ptDrop.spot, next);  }
 },

 
 
 
 onDragEnd : function (tlPos, brPos, tlOffset, brOffset) {

 this.ondragstop();  if ((ptDrop.spot) && (ptDrop.spot.parentNode)){
 ptDrop.spot.parentNode.replaceChild(this, ptDrop.spot); this.numSpot = 0; }

 
 
 if (this.isOutside) {
 var tempParent = this.parentNode; this.parentNode.removeChild(this); if (tempParent.parentNode) 
 tempParent.parentNode.removeChild(tempParent); this.isOutside = false; ptDrop.currContainer.appendChild(this);   ptDragUtils.swap(this, this.initNextItem); } else if (!ptDragUtils.isMoveable(ptDragUtils.nextItem(this))) {
 
 ptDrop.currContainer.appendChild(this); ptDragUtils.swap(this, this.initNextItem);  } else {
 var sortableWidth = this.originalWidth; var nextItem; var isParentChange = false; var isSortOrderChange = false;  nextItem = ptDragUtils.nextItem(this); if (this.parentNode.id != ptDrop.currContainer.id) {
 isParentChange = true; sortableWidth = this.parentNode.brPos.x; } else if (this.initNextItem !== nextItem) {
 isSortOrderChange = true; } 

 if (isParentChange || isSortOrderChange) {

 
 this.originalWidth = sortableWidth;  this.initNextItem = this.currNextItem = nextItem; this.onChange();  } 
 }

 this.parentNode.onDragOut(this);  this.style["width"] = "auto"; this.style["top"] = "0px";  this.style["left"] = "";  if ((ptDrop.dObjs.length == 2) && isParentChange) {
 
 
 
   
 var fromCol = ptDrop.currContainer.id; var toCol = this.parentNode.id; var pgltName = this.id.slice(9); var refrshId = ptUtil.id("rfrsh_" + pgltName); var maxId = ptUtil.id("max_" + pgltName);  var bFireRefresh = false; var clickScript,keyPressScript;  var maxClickScript, maxKeyScript;  if ((fromCol == "ptcol2") && (toCol == "ptcol1")) {
 if (refrshId){
 clickScript = refrshId['onclick'].toString(); clickScript = clickScript.replace(/PORTALPARAM_COMPWIDTH=Wide/i, "PORTALPARAM_COMPWIDTH=Narrow"); keyPressScript = refrshId['onkeypress'].toString(); keyPressScript = keyPressScript.replace(/PORTALPARAM_COMPWIDTH=Wide/i, "PORTALPARAM_COMPWIDTH=Narrow"); }
 if (maxId){
 maxClickScript = maxId['onclick'].toString(); maxClickScript = maxClickScript.replace(/PORTALPARAM_COMPWIDTH=Wide/i, "PORTALPARAM_COMPWIDTH=Narrow"); maxKeyScript = maxId['onkeypress'].toString(); maxKeyScript = maxKeyScript.replace(/PORTALPARAM_COMPWIDTH=Wide/i, "PORTALPARAM_COMPWIDTH=Narrow"); }
 bFireRefresh = true; }
 else if ((fromCol == "ptcol1") && (toCol == "ptcol2")) {
 if (refrshId){
 clickScript = refrshId['onclick'].toString(); clickScript = clickScript.replace(/PORTALPARAM_COMPWIDTH=Narrow/i, "PORTALPARAM_COMPWIDTH=Wide"); keyPressScript = refrshId['onkeypress'].toString(); keyPressScript = keyPressScript.replace(/PORTALPARAM_COMPWIDTH=Narrow/i, "PORTALPARAM_COMPWIDTH=Wide"); }
 if (maxId){
 maxClickScript = maxId['onclick'].toString(); maxClickScript = maxClickScript.replace(/PORTALPARAM_COMPWIDTH=Narrow/i, "PORTALPARAM_COMPWIDTH=Wide"); maxKeyScript = maxId['onkeypress'].toString(); maxKeyScript = maxKeyScript.replace(/PORTALPARAM_COMPWIDTH=Narrow/i, "PORTALPARAM_COMPWIDTH=Wide"); }
 bFireRefresh = true; }

 if (bFireRefresh){
 var refreshURL = ""; if (refrshId){
 clickScript = clickScript.substring(clickScript.indexOf('{')+1, clickScript.length-1); keyPressScript = keyPressScript.substring(keyPressScript.indexOf('{')+1, keyPressScript.length-1); if (browserInfoObj2.isIE){
 refrshId['onclick'] = new Function(clickScript);  refrshId['onkeypress'] = new Function(keyPressScript);  }
 else {
 
  refrshId.setAttribute('onclick', clickScript);  refrshId.setAttribute('onkeypress', keyPressScript);   }

 }
 if (maxId){
 maxClickScript = maxClickScript.substring(maxClickScript.indexOf('{')+1, maxClickScript.length-1); maxKeyScript = maxKeyScript.substring(maxKeyScript.indexOf('{')+1, maxKeyScript.length-1); if (browserInfoObj2.isIE){
 maxId['onclick'] = new Function(maxClickScript);  maxId['onkeypress'] = new Function(maxKeyScript);  }
 else {
  maxId.setAttribute('onclick', maxClickScript);  maxId.setAttribute('onkeypress', maxKeyScript);  }
 }
 
 forceRefresh(pgltName, "", 1); } 
 }
 if (sFormName != "")
 {
 var sGlyphListVar = "sGlyphList_"+sFormName; if (typeof(sGlyphListVar) != "undefined" && sGlyphListVar != null && sGlyphListVar != '')
 {
 eval("ResetGlyph_"+sFormName); if (typeof(sGlyphImgSrc) != "undefined" && sGlyphImgSrc != null && sGlyphImgSrc != '')
 {
 var sGlyph = "GenerateGlyph_"+sFormName+"(sGlyphImgSrc)"; eval(sGlyph); }
 }
 }
 
 
 ptDrop.finalContainerId = this.parentNode.id; if (browserInfoObj2.isIE && document.compatMode != "CSS1Compat") {
 
 
 var liPglt = ptUtil.id("ptpgltli_" + this.id.slice(9)); if (liPglt) {
 setTimeout(function(){
 var zoomSetting = liPglt.style.zoom; liPglt.style.zoom = ""; liPglt.style.zoom = zoomSetting; },0); }
 
 
 setTimeout(function(){
 var colNode = null; var zoomSetting = null; for (var i = 1; i <= 3; i++) {
 if (ptDrop.finalContainerId == "ptcol" + i) 
 continue; else {
 colNode = ptUtil.id("ptcol" + i); if (colNode) {
 zoomSetting = colNode.style.zoom; colNode.style.zoom = ""; colNode.style.zoom = zoomSetting; }
 }
 }
 },0);  } 

 }
}; 