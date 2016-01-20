
var timeout = 500;var closetimer = 0;var ddmenuitem = 0;function removeSubstring(str, strRemove)
{
 if (str == null) { return ""; }
 var nStart = -1,
 nEnd = -1; var strReturn = str; var bFound = false;  nStart = str.indexOf(strRemove); if (nStart != -1)
 {
 do
 {
 strReturn = str.substring(0, nStart);  nEnd = strRemove.length + nStart; if (nEnd >= str.length)
 {
 
 
 bFound = true; break; }
 if ((str.charAt(nEnd) != '|' && str.charAt(nEnd) != '%'))
 {
 
 
 continue; }

 
 bFound = true; strReturn += str.substring(nEnd+1); break;  } while ((nStart = str.indexOf(nStart+nEnd+1, strRemove)) != -1)
 }
 if (!bFound)
 strReturn = str; return strReturn;} 

function removeFromExpiredList(cookie, qs, domain)
{
 var list = cookie.list; if (list == null) 
  return; else
 list = list.toLowerCase();  list = removeSubstring(list, qs)
 
 cookie.list = list;   cookie.$path="/"; cookie.$domain=domain; cookie.remove();   cookie.store();}

function isInExpiredList(cookie, qs)
{
 var bReturn = false; var list = cookie.list; if (list != null)
 {
 list = list.toLowerCase();  var nStart = list.indexOf(qs);  if (nStart != -1)
 {
 var nEnd = nStart + qs.length; if (list.length == nEnd || list.charAt(nEnd) == '|')
 {
 bReturn = true; }
 }
 if (list.indexOf("refresh_all_tabs") != -1)
 bReturn = true; }
 return bReturn;}

function addToExpiredList(cookie, qs, domain) {
 if (qs == null || qs == "")
 return; var list = cookie.list; if (list != null)
 list = list.toLowerCase(); if (!isInExpiredList(cookie, qs))
 {
 if (list == null || list.length == 0)
 list = qs; else
 {
 if (list.lastIndexOf("|") == (list.length-1))
 list = list + qs; else 
 list = list + "|" + qs; }
 cookie.list = list;  cookie.$path="/"; cookie.$domain=domain; cookie.remove(); cookie.store();  }
}


function getAllCookieNames() {
 var tempArray = document.cookie.split(";"); var cookieNames = new Array(); for (var i=0; i<tempArray.length; i++)
 {
 var iEnd = tempArray[i].indexOf("=");   cookieNames[i] = tempArray[i].substring(0,iEnd);  if (cookieNames[i].substring(0,1) == " ")
  cookieNames[i] = cookieNames[i].substring(1);   }
 return cookieNames;}

function removeSomeRefreshcookies(all_cookies, cookieName, domain) {
 var cName = (unescape(cookieName)).toLowerCase(); var iTotal = 0; for (i in all_cookies)
 {
 if (all_cookies[i].length > 40)
 {
 var CurCookieName = (unescape(all_cookies[i])).toLowerCase(); var LastEight=CurCookieName.substr(CurCookieName.length - 8,8);  if (LastEight == "/refresh" && CurCookieName != cName)
 {
 
 
 var pageExpired = new Cookie(document, all_cookies[i]); pageExpired.$path="/"; pageExpired.$domain=domain; pageExpired.remove(); iTotal++; if (iTotal > 3) 
 break; }
 }
 }
}

function removeFromCookie(cookie, qs, domain)
{
 removeFromExpiredList(cookie, qs, domain)
 var list = cookie.list; if (list == null || list == "")
 {
 cookie.$domain=domain; cookie.$path="/";  cookie.remove(); }
}

function docReLoad() 
{

if (navigator.appVersion.indexOf("MSIE 5.0")>0) {
 var hRefPrefix = document.location.protocol.toLowerCase(); if (hRefPrefix == "https:") {
 setTimeout("document.location.reload(true);",1); return true; }
}
 document.location.reload(true); return true;}


function refreshOnExpired(cookieName, qs, domain) {
var all_cookies = getAllCookieNames();if (all_cookies.length >= 17)
 removeSomeRefreshcookies(all_cookies, cookieName, domain);var toRefresh = refreshOnExpired2(cookieName,qs,domain);if ( !toRefresh ) {
 return false;}
docReLoad(); return true;}

function refreshOnExpired2(cookieName, qs, domain)
{
 cookieName = cookieName.toLowerCase(); qs = qs.toLowerCase(); var pageExpired = new Cookie(document, cookieName);  if (pageExpired.load())
 {
 
 if (isInExpiredList(pageExpired, qs))
 {
 
 removeFromCookie(pageExpired, qs, domain);  return true; }
 }
 else
 { 
 
 return false; }
  return nonHPrefreshOnExpired2();}



function nonHPrefreshOnExpired()
{
var toRefresh = nonHPrefreshOnExpired2();updateWindowTitleFromFanPage(); if ( !toRefresh ) {
 return false;}
docReLoad(); return true;}



function nonHPrefreshOnExpired2()
{
 var val = getPSLoginCookieValue(); if (val==-1 && !isLoginError()) {
 
 return true;  }
 return false;}

function setRefreshPage(cookieName, qs, domain)
{
 var remotedashboardtabvalue = getRemoteDashboardTab(); if (remotedashboardtabvalue != "")
 {
 var pos = top.location.href.indexOf("/h/"); var remotedburlvalue = top.location.href.substr(0,pos); remotedburlvalue = remotedburlvalue + "/refresh"; remotedburlvalue = encodeURIComponent(remotedburlvalue); cookieName = remotedburlvalue; qs = "?tab=REMOTEUNIFIEDDASHBOARD"; domain = ptHPRefresh.domain; }

 cookieName = cookieName.toLowerCase(); var pageExpired = new Cookie(document, cookieName); if (!pageExpired.load())
 {
 pageExpired = new Cookie(document, cookieName, 120, "/", domain); }

 qs = qs.toLowerCase();  if (qs == null)
 qs ="?tab=DEFAULT"; addToExpiredList(pageExpired, qs, domain);}

function openPageletActionPageInModal(url) {

 var targetUrl = url.replace("/psp/", "/psc/") + "&ICModalJS=1"; var modalOptions = "bClose@1;bPIA@1;"; var isAccessibilityMode = false; if ((ptIframeHdr.isAccessibility())) {
 return true; } else if ((typeof top.ptalPage != 'undefined') && (top.ptalPage)) {
 top.ptalPage.openInModal(targetUrl); return false; } else if (typeof showModal == 'function') {
 showModal(targetUrl, window, modalOptions, ""); return false; } else {
 return true; }
 
}

var thisGetContxtRoot = function(strURL) {
 var root = ""; var rootIdx = strURL.indexOf("://"); if (rootIdx != -1) {
 root = strURL.substr(rootIdx + 3); var srvlet = String(root).match(/\/ps(c|p)\//); if (srvlet != null) {
 rootIdx = root.indexOf("/"); if (rootIdx != -1)
 root = root.substr(rootIdx, srvlet.index - rootIdx); }
 }
 return root;};var ptBaseURI = "";var nPos = String(location).indexOf('\/psp\/');if (nPos != -1)
{
 ptBaseURI = String(location).substr(nPos,String(location).length); var addressLoc1 = String(ptBaseURI).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc1)
 ptBaseURI = addressLoc1[0].replace('\/psp\/','\/psc\/'); else 
 ptBaseURI = "";}
else 
 ptBaseURI = String(location).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0].replace('psp','psc');var ptPGLTBaseInfo = {
 const_cPRELOADHP : "pgltHPReload", 
 
 ptHPBaseURI : thisGetContxtRoot(String(location)) + ptBaseURI 
};var scriptLoader = function(scriptList, name) {
 var scripter = {
 idname : name ,
 indexer : 0, 
 arrScripts :new Array(), 
 onLoadScript : null, 
 headElem : null, 
 numLoaded : 0, 
 scriptTimer : null,
 callBackFunc : null, 

  init : function(scriptList){
 var script; var ptAttr = null; for (var i=0; i<scriptList.length; i++) {
 script = document.createElement('script'); script.type = 'text/javascript'; script.id = scripter.idname + "_" + i + "_HAScript"; if (scriptList[i].src != "") {
 script.src = scriptList[i].src; }
 else {
 ptAttr = scriptList[i].getAttribute("id"); if (ptAttr && ptAttr == "ptPgltReloadThis")
 script.text = "";  else
 script.text = scriptList[i].text; ptAttr = scriptList[i].getAttribute("ptdefer"); if (ptAttr)
 script.setAttribute("ptdefer", ptAttr); }
 scripter.arrScripts[i] = script; }
 }, 

 getScriptFile: function(x) {
 if (scripter.numLoaded >= (scripter.arrScripts.length)){
 if (scripter.onLoadScript)
 scripter.headElem.appendChild(scripter.onLoadScript); if (scripter.callBackFunc)
 setTimeout(scripter.callBackFunc, 0); return; }
 var newId = scripter.idname + "_" + x +"_HAScript"; var oldScript = document.getElementById(newId); if (oldScript)
 scripter.headElem.removeChild(oldScript); scripter.loadScriptFile(scripter.arrScripts[x]); },

 loadScriptFile: function(scriptFile){
 if (scriptFile.src != ""){
 scriptFile.onerror=scriptFile.onload=scriptFile.onreadystatechange = scripter.chkStateNextScript; scripter.headElem.appendChild(scriptFile); } else if (scriptFile.text != "") {
 var pAttr = scriptFile.getAttribute("ptdefer"); if (pAttr && pAttr == "defer"){
 if (scripter.onLoadScript == null)
 scripter.onLoadScript = scriptFile;  else
 scripter.onLoadScript.text = scripter.onLoadScript.text + scriptFile.text; }
 else
 scripter.headElem.appendChild(scriptFile); scripter.getNextScriptFile(); } else {
 scripter.getNextScriptFile(); }
 },

 getNextScriptFile : function (){
 scripter.numLoaded ++; scripter.indexer ++; scripter.getScriptFile(scripter.indexer); },

 chkStateNextScript:function() {
 if (browserInfoObj2.isSafari) {
 scripter.scriptTimer = setInterval(function(){
 if (/loaded|complete/.test(document.readyState)) {
 clearInterval(scripter.scriptTimer); scripter.scriptTimer = null; scripter.getNextScriptFile(); }
 }, 10); return; }

 var scr = scripter.arrScripts[scripter.indexer]; if (scr && scr.readyState){ 
 if (/loaded|complete/.test(scr.readyState)) {
 if (scripter.scriptTimer){
 clearTimeout(scripter.scriptTimer); scripter.scriptTimer = null; }
 scripter.getNextScriptFile(); } else if (/loading/.test(scr.readyState)){
 scripter.scriptTimer = setTimeout(function(){
 
 clearTimeout(scripter.scriptTimer); scripter.scriptTimer = null;  scripter.getNextScriptFile(); }, 15000); }
 }else { 
 scripter.getNextScriptFile(); }
 return; }
 };  this.loadAllScripts = function(){
 scripter.headElem = document.getElementsByTagName('head')[0]; scripter.iarrSrcScript = 0; scripter.getScriptFile(0); }

 this.setCallBackFunc = function(func){
 scripter.callBackFunc = func; }

 scripter.init(scriptList, name);}; function returnPgltBody(name){
 
 var pgltBody = document.getElementById("ptpgltbody_" + name); if (pgltBody != null)
 return pgltBody; else {
 window.status="cannot identify pagelet's body"; return null; }
}

function isRefreshDisabled(name){
 
 var refreshIco = document.getElementById('rfrshImg_' + name); if (refreshIco == null)
 return true; else {
 if ((refreshIco.disabled) || (refreshIco.getAttribute('disabled') == 'true'))
 return true; else {
 if ((returnPgltBody(name).style.opacity != "") && (returnPgltBody(name).style.opacity < 1))
 return true; else return false; }
 }
}

function refreshDisable(name){
 var refreshAtag = document.getElementById('rfrsh_' + name); var refreshImg = document.getElementById('rfrshImg_' + name); if (refreshImg != null) {
 if (browserInfoObj2.isIE)
 {
 refreshAtag.disabled = true; refreshImg.disabled = true; }
 else
 {
 refreshAtag.setAttribute('disabled', 'disabled'); refreshImg.setAttribute('disabled', 'true'); }
 }
}

function refreshEnable(name){
 var refreshAtag = document.getElementById('rfrsh_' + name); var refreshImg = document.getElementById('rfrshImg_' + name); if (refreshImg != null) {
 if (browserInfoObj2.isIE)
 {
 refreshAtag.disabled = false; refreshImg.disabled = false; }
 else
 {
 refreshAtag.removeAttribute('disabled'); refreshImg.setAttribute('disabled', 'false'); }
 }
}

function isPgltMinimized(name){
 var minIco = document.getElementById('min_' + name); return ((minIco != null) && (minIco.style.display == "none")) ? true : false
}


function getCurrentTab() {
 var itabVal = window.location.search.indexOf("tab="); var tabsub = window.location.search.substr(itabVal); var iSub = tabsub.indexOf("&"); if (iSub > 0)
 return tabsub.substr(0, iSub); else
 return tabsub.substr(0);}

function getRemoteDashboardTab() {

var remotedburltemp = getRemoteDashboardUrl();if (remotedburltemp != ""){
 remotedburltemp = decodeURIComponent(remotedburltemp); var itabVal = remotedburltemp.indexOf("tab="); var tabsub = remotedburltemp.substr(itabVal); var iSub = tabsub.indexOf("&"); if (iSub > 0)
 return tabsub.substr(0, iSub); else
 return tabsub.substr(0); }else
 return "";}

function getRemoteDashboardUrl() {
 var itabVal = window.location.search.indexOf("remotedburl="); if (itabVal != -1) {
 var tabsub = window.location.search.substr(itabVal); return tabsub; }
 return "";}


function setHPCookie (name,value,expires,path,domain,secure) {
 document.cookie = name + "=" + value +
 ((expires) ? "; expires=" + expires.toGMTString() : "") +
 ((path) ? "; path=" + path : "") +
 ((domain) ? "; domain=" + domain : "") +
 ((secure) ? "; secure" : "");}

function getHPCookie(cookieName){
 var res = document.cookie.match('(^|;)?' + cookieName + '=([^;]*)(;|$)'); if (res)
 return(res[2]); else
 return null;}

function addExcpPgltCookie(name,value) {
 var scheme = window.location.href.substr(0,5); var secure = (scheme == "https") ? true : null; var cookieVal = getHPCookie(name); if (cookieVal != null) {
 var expMatch = new RegExp(value, "i"); if (!expMatch.test(cookieVal)) {
 setHPCookie(name,cookieVal + value + "|" ,'','/',document.domain, secure); }
 }else {
 setHPCookie(name,value + "|" ,'','/',document.domain, secure); }
}


function reloadWholeHP(pgltName){
 
 if (browserInfoObj2.isiPad && browserInfoObj2.isSafari) {
 return; }
 addExcpPgltCookie(ptPGLTBaseInfo.const_cPRELOADHP,ptHPRefresh.tabQS.substr(5) + "." + pgltName)
 setRefreshPage(ptHPRefresh.cookie,ptHPRefresh.tabQS,ptHPRefresh.domain); document.location.href = location.href;}

function fadeInPagelet(pgltName){
 setTimeout(function(){hideLoadingImg(pgltName);}, 0); ptCommonObj2.fadeElement("ptpgltbody_" + pgltName, 0, 20, 100, 40, 10); refreshEnable(pgltName); var pgltData = document.getElementById(pgltName + "_Data"); if (pgltData){
 if (browserInfoObj2.isIE)
 pgltData.style.filter=""; else
 pgltData.style.opacity=""; }
}

function updatePglt(pgltName, responseTxt, fade) {

 var minState = isPgltMinimized(pgltName); var idBody = pgltName + "_Data"; var opaqStyle = ""; if (fade){
 opaqStyle = " style='"; opaqStyle += browserInfoObj2.isIE ? "filter:alpha(opacity=1)" : "opacity:0.10"; opaqStyle += "'"; }
 
 
 var pgltBodyHTML = "<div class='ptprtlcontainer' id='" + idBody + "'" + opaqStyle + ">" + responseTxt + " </div>"; var pgltBody = returnPgltBody(pgltName); if (minState) {
 ptCommonObj2.setOpaq(pgltName, 30)
 }
 pgltBody.innerHTML = pgltBodyHTML; if(typeof(fixPageletLinksById) != 'undefined') fixPageletLinksById(pgltName); if (minState) {pgltBody.childNodes[0].style.display = 'none';}
 var scriptList = pgltBody.getElementsByTagName("script"); if (scriptList != null && scriptList.length > 0){
 
 document.write = function(){reloadWholeHP(pgltName);}; document.writeln = function(){reloadWholeHP(pgltName);}; var pgltScripts = new scriptLoader(scriptList, pgltName); if (fade)
 pgltScripts.setCallBackFunc(function(){fadeInPagelet(pgltName)}); else
 pgltScripts.setCallBackFunc(function() { hideLoadingImg(pgltName) }); pgltScripts.loadAllScripts(); } 
 else if (fade) 
 fadeInPagelet(pgltName); else
 hideLoadingImg(pgltName);}



function pgltAction(name, url, fade, force) {

 var remotedburltab =""; remotedburltab = getRemoteDashboardTab();  if (typeof force == "undefined") 
 force = true; if (!force && isRefreshDisabled(name)) return; if (typeof name == "undefined") return; if ((typeof url == "undefined") || (url == ""))
 url = "../?cmd=refreshPglt&pageletname=" + name + "&" + getCurrentTab() + "&" + addPgltParam(name); else if (remotedburltab!= "")
 url = "../?cmd=refreshPglt&pageletname=" + name + "&" + remotedburltab + "&" + addPgltParam(name); else if (!/PORTALPARAM_COMPWIDTH/.test(url)) 
 url += "&" + addPgltParam(name); if (typeof top.ptalPage == 'object' && top.ptalPage)
 url = top.ptalPage.appendPageParameters(url); if(window.location.href.indexOf("remotedburl")> 0)
 {
 url += "&unifieddashboardpagelet=y"; var pgltnodeuninav = document.getElementById("unifiedpgltnodes"); var pgltnodeuni = pgltnodeuninav.innerHTML; var pgltsnodenamesuni = pgltnodeuni.split('####'); url += '&pgltnode=' + pgltsnodenamesuni[1]; }
 
 if(window.location.href.indexOf("remwcdb")> 0)
 {
 var win_href = window.location.href; url += "&unifieddashboardpagelet=y"; var pos_cnode = win_href.search("&contentNode"); var cnode_len = "&contentNode".length;  if(pos_cnode > -1)
 {
 var next_var = win_href.indexOf("&",pos_cnode + cnode_len); var cnode = win_href.substr(pos_cnode + cnode_len + 1, next_var); url += "&pgltnode=" + cnode; }
 }


 if (fade) {
 refreshDisable(name); var pBody = returnPgltBody (name); if ((browserInfoObj2.isIE) && (pBody.currentStyle["backgroundColor"]=="transparent"))
 pBody.style.backgroundColor = "#ffffff";  var nextTimer = ptCommonObj2.fadeElement("ptpgltbody_" + name, 1, 20, 100, 40, 10); this["loadingTimer_" + name] = setTimeout(function(){showLoading(name);}, nextTimer * 10); }

 var loader = new net2.ContentLoader(url,null, null, "GET",
 function(){
 if (this.req.responseText != null) {
 
 
 if (typeof ptConsole2 !== "undefined" && typeof ptConsole2.isActive !== "undefined" && ptConsole2.isActive() && !bPerf) {
 ptConsole2.append((new Date()).valueOf() +"\n response:\n" + this.req.responseText); }

 updatePglt(name, this.req.responseText, fade);  if (/\/h\/\?tab=/.test(location)) {
 var strURL = '?cmd=getCachedPglt&pageletname=' + name + '&' + getCurrentTab(); setRefreshPage(ptHPRefresh.cookie,strURL,ptHPRefresh.domain); }
 } 
 }, null,null, "application/x-www-form-urlencoded");}


function addPgltParam(name){
 var liPglt = ptUtil.id("ptpgltli_" + name); if (!liPglt) return;  var col2Node = ptUtil.id("ptcol2"); var addParam = ""; if ((liPglt.parentNode.id == "ptcol2") && (!ptUtil.getNextSibling(col2Node.parentNode, "td")))
 addParam = "PORTALPARAM_COMPWIDTH=Wide";  else
 addParam = "PORTALPARAM_COMPWIDTH=Narrow";  var ptGlobalPglt = document.getElementById("globalpagelets"); if(ptGlobalPglt){
 var gtemp = ptGlobalPglt.innerHTML.split("#"); if(gtemp.indexOf(name) == -1)
 addParam += "&bNoGlobal=Y"; }
 return addParam;}




function forceRefresh(name, url, fade){
 
 if ((typeof url == "undefined") || (url == ""))
 url = "../?cmd=getCachedPglt&pageletname=" + name + "&" + getCurrentTab() + "&" + addPgltParam(name); if (!isPgltMinimized(name)) {
 pgltAction(name, url, fade, true); return; }
 else {
 
 var pgltBody = document.getElementById('ptpgltbody_row_' + name); var i=0; var cellBody = pgltBody.cells[0]; var hasBodyData = false;  if (cellBody){
 for (i=0; i<cellBody.childNodes.length; i++) {
 chNode = cellBody.childNodes[i].nodeName; if (chNode == "DIV") {
 hasBodyData = true; break; }
 }
 }

 if (!hasBodyData){
 
 return;  }
 else {
 

 var loader = new net2.ContentLoader(url,null, null, "GET",
 function(){
 if (this.req.responseText != null) {
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() +"\n response:\n" + this.req.responseText); var idBody = name + "_Data"; var pgltBodyHTML = "<div class='ptprtlcontainer' id='" + idBody + "' style='display:none'>" + this.req.responseText + " </div>"; var pgltBody = returnPgltBody(name); pgltBody.innerHTML = pgltBodyHTML; var scriptList = pgltBody.getElementsByTagName("script"); if (scriptList != null && scriptList.length > 0){
 document.write = function(){reloadWholeHP(name);}; document.writeln = function(){reloadWholeHP(name);}; var pgltScripts = new scriptLoader(scriptList, name); pgltScripts.loadAllScripts(); } 

 if (/\/h\/\?tab=/.test(location)) {
 var strURL = '?cmd=getCachedPglt&pageletname=' + name + '&' + getCurrentTab(); setRefreshPage(ptHPRefresh.cookie,strURL,ptHPRefresh.domain); }
 } 
 }, null,null, "application/x-www-form-urlencoded"); }
 }
}




function pgltActionMax(name, url, fade, reload, callBack) {
 if (typeof name == "undefined") return; if ((typeof url == "undefined") || (url == ""))
 url = "../?cmd=getCachedPglt&pageletname=" + name + "&" + getCurrentTab() + "&" + addPgltParam(name); if(window.location.href.indexOf("remotedburl")> 0)
 {
 url += "&unifieddashboardpagelet=y"; var pgltnodeuninav = document.getElementById("unifiedpgltnodes"); var pgltnodeuni = pgltnodeuninav.innerHTML; var pgltsnodenamesuni = pgltnodeuni.split('####'); url += '&pgltnode=' + pgltsnodenamesuni[1]; }
 if(window.location.href.indexOf("remwcdb")> 0)
 {
 var win_href = window.location.href; url += "&unifieddashboardpagelet=y"; var pos_cnode = win_href.search("&contentNode"); var cnode_len = "&contentNode".length;  if(pos_cnode > -1)
 {
 var next_var = win_href.indexOf("&",pos_cnode + cnode_len); var cnode = win_href.substr(pos_cnode + cnode_len + 1, next_var); url += "&pgltnode=" + cnode; }
 }

 if (typeof top.ptalPage == 'object' && top.ptalPage)
 url = top.ptalPage.appendPageParameters(url); toggleMaxIcon(name, 'none'); var pBody = returnPgltBody(name);  var idBody = name + "_" + "Blank"; pBody.innerHTML = "<div class='ptprtlcontainer' id='" + name + "_" + "Blank'><br /><br /><br /><br /></div>"; if (fade) {
 refreshDisable(name); if ((browserInfoObj2.isIE) && (pBody.currentStyle["backgroundColor"]=="transparent"))
 pBody.style.backgroundColor = "#ffffff";  var nextTimer = ptCommonObj2.fadeElement("ptpgltbody_" + name, 1, 20, 100, 40, 10); this["loadingTimer_" + name] = setTimeout(function(){showLoading(name);}, nextTimer * 10); }
 else
 showLoading(name); var headerArray = null; if (typeof reload != "undefined" && reload) {
 
 var headerArray = new Array(1); headerArray[0] = new Array(2); headerArray[0][0] = "If-Modified-Since"; headerArray[0][1] = new Date().toGMTString(); }

 if (ptConsole2.isActive() && bPerf) 
 ptConsole2.append((new Date()).valueOf() +": paglet load start:"+name); var loader = new net2.ContentLoader(url,null, null, "GET",
 function(){
 if (this.req.responseText != null) {
 updatePglt(name, this.req.responseText, fade); var liPglt = ptUtil.id("ptpgltli_" + name); if (liPglt && browserInfoObj2.isIE && document.compatMode != "CSS1Compat") {
 
 
 setTimeout(function(){
 var zoomSetting = liPglt.style.zoom; liPglt.style.zoom = ""; liPglt.style.zoom = zoomSetting; }, 0);  } 
 if (ptConsole2.isActive() && bPerf) 
 ptConsole2.append((new Date()).valueOf() +": paglet load end:"+name); if (typeof(callBack) !== "undefined" && callBack) {
 callBack.call(this); }
 }
 }, null,null, "application/x-www-form-urlencoded", 1, 0, headerArray);}


function toggleMaxIcon(name, maxDisplay){
 var minImg = document.getElementById('min_' + name); var maxImg = document.getElementById('max_' + name); var refreshImg = document.getElementById('rfrsh_' + name); if (maxDisplay == 'block'){
 
 if (minImg) minImg.style.display = 'none'; if (maxImg) maxImg.style.display = 'block'; if (refreshImg) refreshImg.style.display = 'none'; }
 else{
 
 if (minImg) minImg.style.display = 'block'; if (maxImg) maxImg.style.display = 'none'; if (refreshImg) refreshImg.style.display = 'block';  }
}


function pgltMinMax(name, url, srcurl) {
 if ((typeof name == "undefined") || (typeof url == "undefined") || (typeof srcurl == "undefined"))
 return; var pgltBody = document.getElementById('ptpgltbody_row_' + name); var i=0; var cellBody = pgltBody.cells[0]; var hasBodyData = false;  if (cellBody)
 for (i=0; i<cellBody.childNodes.length; i++) {
 chNode = cellBody.childNodes[i].nodeName; if (chNode == "DIV") {
 hasBodyData = true; break; }
 }

 if (url.indexOf('HPCompMinimize') != -1) {
 
 if (hasBodyData){
 if (typeof(this["id_" + name]) != "undefined")
 clearTimeout(this["id_" + name]); cellBody.childNodes[i].style.display = 'none'; var pgltThisBody = returnPgltBody(name); pgltThisBody.style.height = ""; }
 toggleMaxIcon(name, 'block'); hideLoadingImg(name); }
 else { 
 if (hasBodyData) { 
 cellBody.childNodes[i].style.display = ''; toggleMaxIcon(name, 'none');  var setRTime = document.getElementById(name).getAttribute("setRefreshTime"); if (setRTime != null)
 pgltRefreshTimer(name, setRTime);   }
 else {
 var pgltBody = returnPgltBody(name); pgltBody.innerHTML = "<div class='ptprtlcontainer'><br /><br /><br /><br /></div>"; pgltActionMax(name, srcurl, 1);  }
 }
 var remotedashboardtab =""; remotedashboardtab = getRemoteDashboardTab(); if (remotedashboardtab != "")
 {
 remotedashboardburl = decodeURIComponent(getRemoteDashboardUrl()); remotedashboardburl = remotedashboardburl.split("\/"); var pthomeBaseURI = ""; var nPos = String(location).indexOf('\/psp\/'); if (nPos != -1)
 {
 pthomeBaseURI = String(location).substr(nPos,String(location).length); var addressLoc = String(pthomeBaseURI).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//); if (addressLoc)
 {
 var localnode = "/" + addressLoc[4] + "/" ; var remotenode = "/" + remotedashboardburl[6] + "/"; pthomeBaseURI = addressLoc[0].replace(localnode,remotenode); }
 else
 {
 pthomeBaseURI = ""; }
 }
 else {
 pthomeBaseURI = String(location).match(/\/ps(c|p)\/?([^\/]*)?\/?([^\/]*)?\/?([^\/]*)?\//)[0]; pthomeBaseURI.replace(localnode,remotenode); }
 pthomeBaseURI = thisGetContxtRoot(String(location)) + pthomeBaseURI; var loader = new net2.ContentLoader(pthomeBaseURI+url+"&cmd=SMARTNAV",null, null, "GET",function(){}, null,null, "application/x-www-form-urlencoded"); }
 else
 
 var loader = new net2.ContentLoader(ptPGLTBaseInfo.ptHPBaseURI+url,null, null, "GET",function(){}, null,null, "application/x-www-form-urlencoded"); mclose();}







function pgltRefreshTimer(name, rTime, url){
 if ((typeof name == "undefined") || (name == "") || (typeof rTime == "undefined") || (rTime < 1)) return; if (typeof url == "undefined") url = ""; if (typeof(this["id_" + name]) != "undefined")
 clearTimeout(this["id_" + name]); document.getElementById(name).setAttribute("setRefreshTime", rTime); this["id_" + name] = setTimeout(function(){pgltAction(name, url);}, rTime*1000);  return this["id_" + name];}

function showLoading(name){


 var divLoader = document.getElementById("div_loading_" + name); if (divLoader) {
 if (browserInfoObj2.isIE) {
 divLoader.style.height = returnPgltBody(name).clientHeight; divLoader.className = "ptoverlay ptoverlayIE ptoverlayshow"; }
 else divLoader.className = "ptoverlay ptoverlayshow"; if (browserInfoObj2.isIE && browserInfoObj2.version <= 6)
 hideSelectBoxes(returnPgltBody(name)); }
}

function hideLoadingImg(name){
 if (typeof(this["loadingTimer_" + name]) != "undefined")
 clearTimeout(this["loadingTimer_" + name]); var divLoader = document.getElementById("div_loading_" + name); if (divLoader) {
 divLoader.className = "ptoverlay ptoverlayhide";   }
}



function hideSelectBoxes(elPglt)
{
 var sels = elPglt.getElementsByTagName('select'); if (sels){
 for(var i = 0; i < sels.length; i++)
 sels[i].style.visibility="hidden"; }
}


function displaySelectBoxes(elPglt)
{
 var sels = elPglt.getElementsByTagName('select'); if (sels){
 for(var i = 0; i < sels.length; i++)
 sels[i].style.visibility="visible"; }
}

function getPgltClass(searchClass,node,tag) {
 var classElems = []; if (!node) { node = document; }
 if (!tag) { tag = "*"; }
 var els = node.getElementsByTagName(tag); var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)"); for (var i = 0, j = els.length; i < j; i++)
 if (pattern.test(els[i].className) ) { classElems.push(els[i]); }

 return classElems;}



function centerLabel(pgltImg) {
 if (pgltImg) {
 var pgltImgPrefix = "ptpglthdrimg_", 
 pgltLblPrefix = "ptpgltlbl_";     (function() {
 if (pgltImg.offsetHeight === 0) {
 setTimeout(arguments.callee,0); return; }
 var pgltLbl = ptUtil.id(pgltLblPrefix + pgltImg.id.slice(pgltImgPrefix.length)); if (pgltLbl) { pgltLbl.style.lineHeight = pgltImg.offsetHeight + "px"; }
 })(); }
}


function addLinkId(linkAnc) {
 var pos = location.search.indexOf("pslnkid=");  if (pos === -1 || !linkAnc || linkAnc.href.indexOf("PT_LINKID_NONE") === -1) { return; }
 var linkQS = location.search.substring(pos).split("&"); var linkId = linkQS[0].split("=")[1]; linkAnc.href = linkAnc.href.replace(/PT_LINKID_NONE/i,linkId);}

function updatePgltHdrImage(responseText) {
var pos = responseText.indexOf("?pgltName");var pgltName = responseText.substring(pos).split("=");var orgImg = document.getElementById("ptpglthdrimg_"+pgltName[1]);var tmpImg = new Image();tmpImg.id = orgImg.id;tmpImg.alt = orgImg.alt;tmpImg.title = orgImg.title;tmpImg.onload = function()
{
 centerLabel(this);}
orgImg.parentNode.replaceChild(tmpImg,orgImg);tmpImg.src = responseText;}


function loadRemoteImages(sUrl)
{
var loader = new net2.ContentLoader(sUrl,null, null, "GET",
 function(){
 if (this.req.responseText != null) {
 
 
 if (typeof ptConsole2 !== "undefined" && typeof ptConsole2.isActive !== "undefined" && ptConsole2.isActive() && !bPerf) {
 ptConsole2.append((new Date()).valueOf() +"\n response:\n" + this.req.responseText); }

 updatePgltHdrImage(this.req.responseText);  } 
 }, null,null, "application/x-www-form-urlencoded");}


function GenerateFakeBC() {

 
 var bcContainer; try {
 if(top.frames['TargetContent'] && top.frames['TargetContent'].document)
 bcContainer = top.frames['TargetContent'].document.getElementById("pt_fakeBC"); }
 catch (e) {}

 if (bcContainer) {
 var n = bcContainer.innerHTML; bcContainer.innerHTML=n.split("\n").join("");  var abnBCData = bcContainer.removeChild(bcContainer.firstChild); bcContainer.parentNode.removeChild(bcContainer); try {
 if (!isCrossDomain(parent) && typeof(parent.ptIframe) !== "undefined") {
 if (typeof(parent.pthNav) !== "undefined") {
 
 parent.pthNav.FakeBCUpdate(abnBCData);  }
 }
 } catch (e) {}
 return; } 
}


function loadAllPgltData(cmdReload, t){

 
 backNavigation.setCookie();  var tabLabel = ptUtil.id("ptdashboardlabel"); if (tabLabel) {
 tabLabel = tabLabel.innerHTML; } else {
 tabLabel = "Home"; }
 AddToHistory(tabLabel,"","",getCurrentTab().split("tab=")[1],0,0,location.href,true); var bcList = top.document.getElementById("pthbcUlScroll"); if (typeof bcList != 'undefined' &&
 typeof(top.pthNav) != "undefined" &&
 typeof(bcUpdater) != "undefined" &&
 (bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == "D" || top.pthNav.isMenuCrefNav == "D")) {

 
 
 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "F"); top.pthNav.isMenuCrefNav = "F";  bcUpdater.setStoredData(bcUpdater.breadCrumbHTML, bcList.innerHTML); bcUpdater.setBcListWidth(bcList.parentNode); } else if (typeof bcList != 'undefined' &&
 typeof(top.pthNav) != "undefined" &&
 typeof(bcUpdater) != "undefined" &&
 (bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == "N" || top.pthNav.isMenuCrefNav == "N")) {

 
 var bUlCreated = false; var eFakeBc = document.querySelector("#pt_fakeBC"), eDashboardBc = bcList.children[bcList.children.length - 1]; if (typeof eFakeBc != "undefined" && eFakeBc) {
 if (bcList.nodeName.toLowerCase() == "div") {
 
 var eParent = bcList.parentNode; eParent.removeChild(bcList); var newUl = document.createElement("ul"); newUl.setAttribute("id", "pthbcUlScroll")
 newUl.setAttribute("dir", "ltr"); eParent.appendChild(newUl); bUlCreated = true; } else {
 
 var nChildCount = bcList.children.length; for (var i = 0; i < nChildCount; i++) {
 bcList.removeChild(bcList.children[bcList.children.length - 1]); }
 }

 
 bcList = document.querySelector("#pthbcUlScroll"); bcList.innerHTML = eFakeBc.children[0].innerHTML; var eDashboard = bcList.querySelector(".ptfakercfbc"); if (typeof eDashboard != "undefined" && eDashboard) {
 var szId = eDashboard.id.replace("_PT_FAKE_", "_"); eDashboard.setAttribute("id", szId); ptUtil.removeClass(eDashboard, "ptabncrefbc"); ptUtil.removeClass(eDashboard, "ptfakercfbc"); }

 
 bcUpdater.addNUIToBC(); bcList = document.querySelector("#pthbcUlScroll");  if (bUlCreated) {
 bcUpdater.setBcListWidth(bcList.parentNode);   if (browserInfoObj2.isIE && bcList.parentNode.style.width == "") {
 bcList.parentNode.style.width = "300px"; }
 }

 
 bcList = document.querySelector("#pthbcUlScroll"); parent.pthNav.addBreadcrumbEvents(); bcUpdater.addBcCrefEvents(bcList); } else if (bcList.children.length > 0 && eDashboardBc && eDashboardBc.querySelector(".ptndbrd")) {
 
 while (bcList.children.length > 2) { bcList.removeChild(bcList.children[0]); }

 
 bcUpdater.addNUIToBC();  bcList = document.querySelector("#pthbcUlScroll"); parent.pthNav.addBreadcrumbEvents(); bcUpdater.addBcCrefEvents(bcList); }

 
 bcUpdater.setStoredData(bcUpdater.breadCrumbHTML, bcList.innerHTML); bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "F"); top.pthNav.isMenuCrefNav = "F";  } else { 
 
 
 if (typeof(bcUpdater) != "undefined" && bcUpdater) {
 bcUpdater.clearStoredData(); }
 } 
 
 if (!ptConsole2.isEnabled() && bPerf) {
 ptConsole2.enable(); ptConsole2.active(); }

 var isSafariOniPad = browserInfoObj2.isiPad && browserInfoObj2.isSafari; var pgltQueue = {
 reqs: 0,  
 MAX_REQS: 6,  
 args: [], 
  init: function () {
 setTimeout(function(){
 if (!pgltQueue.args.length) { return; }

  if (pgltQueue.reqs < pgltQueue.MAX_REQS) {
 pgltQueue.reqs++; var params = pgltQueue.args.shift(); pgltActionMax(params.name,params.url,params.fade,params.reload,params.fn);  } 
 setTimeout(arguments.callee,100); }, 100); },
 dequeue: function () {
 pgltQueue.reqs--; },
  queue: function (params) {
 pgltQueue.args.push(params);  }
 }; var colIds = ["ptcol0", "ptcol1", "ptcol2", "ptcol3"];  var is3ColLayout = (document.getElementById(colIds[2]) != null)
 var colNode; var pglts; var i,j,k; var pname; var pURL; var bReload = false; var addParam; var pBody;  if (isWorkCenter()){
 GenerateFakeBC(); }

 
 if (refreshOnExpired2(ptHPRefresh.cookie, "?rp=" + getCurrentTab().slice(4).toLowerCase(),ptHPRefresh.domain)) {
 cmdReload="true"; }
 var hpLayoutMode = document.getElementById('ptLayoutMode'); var hpLayoutValue = hpLayoutMode ? hpLayoutMode.innerHTML : null; var remotedbtab =""; remotedbtab = getRemoteDashboardTab(); for (i = 0; i < 4; i++) {
 colNode = document.getElementById(colIds[i]); if (colNode) {
 pglts = getPgltClass("pthpli",colNode,"li"); for (j = 0, k = pglts.length; j < k; j++) {
 pname = pglts[j].id.slice(9); pBody = returnPgltBody(pname); if (!isPgltMinimized(pname) && (pBody.innerHTML == "")) {
 if (remotedbtab == "")
 pURL = '?cmd=getCachedPglt&pageletname=' + pname + '&' + getCurrentTab(); else
 pURL = '?cmd=getCachedPglt&pageletname=' + pname + '&' + remotedbtab; addParam = "&" + addPgltParam(pname); if (browserInfoObj2.isFF) 
 addParam += "&t=" + t; if (typeof top.ptalPage == 'object' && top.ptalPage)
 pURL = top.ptalPage.appendPageParameters(pURL);  if (hpLayoutValue)
 addParam += hpLayoutValue.replace("&amp;", "&"); bReload = false; if (cmdReload == "true")
 bReload = true; else {
 if ((cmdReload == "portlets") && (pname.indexOf("WSRP_") == 0)){
 bReload = true; setRefreshPage(ptHPRefresh.cookie,ptHPRefresh.tabQS,ptHPRefresh.domain); }
 else {
 
 
 bReload = refreshOnExpired2(ptHPRefresh.cookie,pURL,ptHPRefresh.domain); }
 }
 
 if (!isSafariOniPad) {
 pgltActionMax(pname, pURL + addParam, 0, bReload); } else {
 if (pgltQueue.reqs < pgltQueue.MAX_REQS) {
 pgltQueue.reqs++; pgltActionMax(pname, pURL + addParam, 0, bReload, pgltQueue.dequeue); } else {
 pgltQueue.queue({name:pname,url:pURL + addParam,fade:0,reload:bReload,fn:pgltQueue.dequeue}); }
 } 
 } 
 else if(isPgltMinimized(pname) && document.getElementById("rfrsh_"+pname)) document.getElementById("rfrsh_"+pname).style.display="none"; } 
 } 
 } 

 if (isSafariOniPad) {
 pgltQueue.init(); }

} 

 
 function mopen(event, pid)
 {
 
 this.mcancelclosetime(); if(!document.getElementById("ptpageletDropdown_"+pid)) 
 {
 pid=pid.id; }
 var el =document.getElementById("ptpageletDropdown_"+pid);  var mwidth=document.getElementById("pt_dropdownicon_"+pid).offsetLeft + document.getElementById("pt_dropdownicon_"+pid).width; var mheight=document.getElementById("pt_dropdownicon_"+pid).offsetTop + document.getElementById("pt_dropdownicon_"+pid).height;  this.mclose();  ddmenuitem = document.getElementById("ptpageletDropdown_"+pid); var divpagecontrols = document.getElementById("ptpageletDropdown_"+pid); ddmenuitem.style.visibility = 'visible';  var rtladjust = 0; if("ltr" == "rtl")
 {
 if (!browserInfoObj2.isIE) rtladjust = ddmenuitem.offsetWidth - document.getElementById("pt_dropdownicon_"+pid).width -2; else rtladjust = ddmenuitem.offsetWidth - document.getElementById("pt_dropdownicon_"+pid).width -4; }

 var ele=document.getElementById("pt_dropdownicon_"+pid); if(!browserInfoObj2.isIE)
 {
 divpagecontrols.style.left = mwidth + 2 - ddmenuitem.offsetWidth + rtladjust +"px"; divpagecontrols.style.top = mheight + "px"; }
 else
 {
 divpagecontrols.style.left = mwidth + 5 - ddmenuitem.offsetWidth + rtladjust +"px"; divpagecontrols.style.top = mheight - 3 + "px"; document.getElementById("ptpgltli_"+pid).style.zIndex = 2; }

 ptUtil.swapClass(ele,"ptPgltcontrolsdropdown","ptPgltcontrolsdropdownclickedTopBorder");}



 
 function mclose()
 {
 if(ddmenuitem){
 ddmenuitem.style.visibility = 'hidden'; var menuid= ddmenuitem.id; menuid=menuid.substring(18,menuid.length); var ele=document.getElementById("pt_dropdownicon_"+menuid); ptUtil.swapClass(ele,"ptPgltcontrolsdropdownclickedTopBorder","ptPgltcontrolsdropdown"); if(browserInfoObj2.isIE && document.getElementById("ptpgltli_"+menuid).style.zIndex!=1)
 
 document.getElementById("ptpgltli_"+menuid).style.zIndex = 0; } 
 }

 
 function mclosetime()
 {
 closetimer = window.setTimeout(this.mclose, timeout); }

 
 function mcancelclosetime()
 {
 if(closetimer)
 {
 window.clearTimeout(closetimer); closetimer = null; }
 }

 function mkeyevents(ev,pid) {

 var key = (window.event) ? window.event.keyCode: ev.keyCode; if(ev.type == "keydown")
 {

 if(key == 13)
 this.mopen(ev,pid); else if(key==27)
 this.mclose(); else if(key==40)
 {
 var i=0; var op=document.getElementById("ptpageletDropdown_"+pid).children; while(op[i].offsetHeight == 0)i++; op[i].focus(); }

 else return false; if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false; }
 if(key==13 || key == 27 || key == 40)
 {
 if(ev.stopPropagation) ev.stopPropagation(); else ev.cancelBubble = true; }
}


 function marrowkeys(ev) {

 var key = (window.event) ? window.event.keyCode: ev.keyCode; var op = ev.currentTarget || ev.srcElement ; op = op.parentElement.children; var i=0; var currenttarget = ev.currentTarget || ev.srcElement; while(op[i]!=currenttarget && i < op.length)i++; if(key == 27) this.mclose(); else if(key == 9)
 {
 if(!ev.shiftKey)
 {
 i++; while(i<op.length && op[i].offsetHeight == 0) i++; }
 if(ev.shiftKey)
 { 
 i--; while(i>=0 && op[i].offsetHeight == 0) i--;  }
 if(i == op.length || i<0) 
 {
 mclose();  }
 return; }

 else if(key == 40)
 {
 i++; while(i<op.length && op[i].offsetHeight == 0) i++; if(op[i]!=null)
 {
 currenttarget.blur(); op[i].focus(); }
 }

 else if(key == 38) 
 { 
 i--; while(i>=0 && op[i].offsetHeight == 0) i--;  if(op[i]!= null)
 {
 currenttarget.blur(); op[i].focus(); }
 }
 else return false; if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;}

function showHoverRefresh(pid) {
 document.getElementById("rfrshImg_"+pid).style.display="none"; document.getElementById("rfrshImgonHover_"+pid).style.display="inline";}

function hideHoverRefresh(pid) {
 document.getElementById("rfrshImgonHover_"+pid).style.display="none"; document.getElementById("rfrshImg_"+pid).style.display="inline";}

function updateWindowTitleFromFanPage() {

 var ptWindowTitle = document.getElementsByTagName("title")[0].innerHTML
 if (typeof(ptWindowTitle) != 'undefined' && ptWindowTitle != null && ptWindowTitle != "")
 {
 top.document.title = ptWindowTitle; }
}
