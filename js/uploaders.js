function notifyusers(){var e=location.pathname,t=location.search;if(""==(t=(t=(t=(t=t.replace("&response","")).replace("?response","")).replace("?del","?nodel")).replace("&del","&nodel"))?t="?":t+="&",1==$("#userslist :checkbox:checked").length>0){var r=$.now(),n=$("#userslist").serialize();$.ajax({cache:!1,type:"POST",url:"vfm-admin/ajax/sendupnotif.php?t="+r,data:n}).done((function(r){setTimeout((function(){location.href=e+t+"response"}),800)}))}else setTimeout((function(){location.href=e+t+"response"}),800)}function resumableJsSetup(e,t,r,n){e=e||"no",n=n||!1;navigator.userAgent.toLowerCase();var a=e,i=new Resumable({target:"vfm-admin/chunk.php?loc="+t,simultaneousUploads:3,prioritizeFirstAndLastChunk:!0,minFileSizeErrorCallback:function(e,t){setTimeout((function(){alert(e.fileName||e.name+" is not valid.")}),1e3)}}),o=0,s=0;if(i.support&&"no"==a)i.assignBrowse(document.getElementById("upchunk")),i.assignDrop(document.getElementById("uparea")),$("#fileToUpload").attr("placeholder",r),i.on("uploadStart",(function(){$("#resumer").remove(),$("#upchunk").before('<button class="btn btn-primary" id="resumer"><i class="fa fa-pause"></i></button>'),window.onbeforeunload=function(){return"Are you sure you want to leave?"},$("#resumer").on("click",(function(){i.pause()}))})),i.on("pause",(function(){$("#resumer").remove(),$("#upchunk").before('<button class="btn btn-primary" id="resumer"><i class="fa fa-play"></i></button>'),$("#resumer").on("click",(function(){i.upload()}))})),i.on("progress",(function(){o=100*i.progress(),s=o.toFixed(1),$(".upbar p").html(s+"%"),$(".upbar").width(o+"%")})),1==n&&i.on("fileProgress",(function(e){o=100*e.progress(!0),$(".upbarfile p").html(e.fileName),$(".upbarfile").width(o+"%")})),i.on("error",(function(e,t){console.log(e,t)})),i.on("fileAdded",(function(e,t){i.upload()})),i.on("fileSuccess",(function(e,t){var r='<input type="hidden" name="filename[]" value="'+e.fileName+'">';$("#userslist").append(r)})),i.on("complete",(function(){window.onbeforeunload=null,notifyusers()})),$("#uparea").on("dragstart dragenter dragover",(function(e){$(".overdrag").css("display","block")})),$(".overdrag").on("drop dragleave dragend mouseup",(function(e){$(".overdrag").css("display","none")}));else{var u=!!document.all;$("#upchunk").remove(),$("#upformsubmit").prop("disabled",!0).show(),u||"Windows"===$.client.os&&"Safari"===$.client.browser||"yes"===a?($("#upload_file").css("display","table-cell"),$(".ie_hidden").remove(),$(document).on("click","#upformsubmit",(function(e){$("#fileToUpload").val("Loading....")}))):($(document).on("click","#fileToUpload",(function(){$(".upload_file").trigger("click")})),$(document).on("click","#upformsubmit",(function(e){e.preventDefault(),$(".upload_file").trigger("click")}))),$(document).ready((function(){var e=$("#progress-up"),t=$(".upbar"),r=$(".upbar p");$("#upForm").ajaxForm({beforeSend:function(){e.css("opacity",1)},uploadProgress:function(e,n,a,i){var o=i,s=i.toFixed(1);t.width(o),r.html(s)},success:function(){t.width("100%"),r.html("100%")},complete:function(e){notifyusers()}})})),$(".btn-file :file").on("fileselect",(function(e,t,r){for(var n=$(this).parents(".input-group").find(":text"),a=t>1?t+" files selected":r,i=$(this)[0].files,o=0;o<i.length;o++){var s='<input type="hidden" name="filename[]" value="'+i[o].name+'">';$("#userslist").append(s)}n.length&&(n.val(a),u?$("#upformsubmit").prop("disabled",!1):$("#upForm").submit())}))}}!function(){"use strict";var e=function(t){function r(e,t,r){var a=this;a.opts={},a.getOpt=e.getOpt,a._prevProgress=0,a.resumableObj=e,a.file=t,a.fileName=t.fileName||t.name,a.size=t.size,a.relativePath=t.webkitRelativePath||t.relativePath||a.fileName,a.uniqueIdentifier=r,a._pause=!1,a.container="";var o=void 0!==r,s=function(e,t){switch(e){case"progress":a.resumableObj.fire("fileProgress",a);break;case"error":a.abort(),o=!0,a.chunks=[],a.resumableObj.fire("fileError",a,t);break;case"success":if(o)return;a.resumableObj.fire("fileProgress",a),a.isComplete()&&a.resumableObj.fire("fileSuccess",a,t);break;case"retry":a.resumableObj.fire("fileRetry",a)}};return a.chunks=[],a.abort=function(){var e=0;i.each(a.chunks,(function(t){"uploading"==t.status()&&(t.abort(),e++)})),e>0&&a.resumableObj.fire("fileProgress",a)},a.cancel=function(){var e=a.chunks;a.chunks=[],i.each(e,(function(e){"uploading"==e.status()&&(e.abort(),a.resumableObj.uploadNextChunk())})),a.resumableObj.removeFile(a),a.resumableObj.fire("fileProgress",a)},a.retry=function(){a.bootstrap();var e=!1;a.resumableObj.on("chunkingComplete",(function(){e||a.resumableObj.upload(),e=!0}))},a.bootstrap=function(){a.abort(),o=!1,a.chunks=[],a._prevProgress=0;for(var e=a.getOpt("forceChunkSize")?Math.ceil:Math.floor,t=Math.max(e(a.file.size/a.getOpt("chunkSize")),1),r=0;t>r;r++)!function(e){window.setTimeout((function(){a.chunks.push(new n(a.resumableObj,a,e,s)),a.resumableObj.fire("chunkingProgress",a,e/t)}),0)}(r);window.setTimeout((function(){a.resumableObj.fire("chunkingComplete",a)}),0)},a.progress=function(){if(o)return 1;var e=0,t=!1;return i.each(a.chunks,(function(r){"error"==r.status()&&(t=!0),e+=r.progress(!0)})),e=t||e>.99999?1:e,e=Math.max(a._prevProgress,e),a._prevProgress=e,e},a.isUploading=function(){var e=!1;return i.each(a.chunks,(function(t){return"uploading"==t.status()?(e=!0,!1):void 0})),e},a.isComplete=function(){var e=!1;return i.each(a.chunks,(function(t){var r=t.status();return"pending"==r||"uploading"==r||1===t.preprocessState?(e=!0,!1):void 0})),!e},a.pause=function(e){a._pause=void 0===e?!a._pause:e},a.isPaused=function(){return a._pause},a.resumableObj.fire("chunkingStart",a),a.bootstrap(),this}function n(e,t,r,n){var a=this;a.opts={},a.getOpt=e.getOpt,a.resumableObj=e,a.fileObj=t,a.fileObjSize=t.size,a.fileObjType=t.file.type,a.offset=r,a.callback=n,a.lastProgressCallback=new Date,a.tested=!1,a.retries=0,a.pendingRetry=!1,a.preprocessState=0;var o=a.getOpt("chunkSize");return a.loaded=0,a.startByte=a.offset*o,a.endByte=Math.min(a.fileObjSize,(a.offset+1)*o),a.fileObjSize-a.endByte<o&&!a.getOpt("forceChunkSize")&&(a.endByte=a.fileObjSize),a.xhr=null,a.test=function(){a.xhr=new XMLHttpRequest;var e=function(e){a.tested=!0;var t=a.status();"success"==t?(a.callback(t,a.message()),a.resumableObj.uploadNextChunk()):a.send()};a.xhr.addEventListener("load",e,!1),a.xhr.addEventListener("error",e,!1),a.xhr.addEventListener("timeout",e,!1);var t=[],r=a.getOpt("parameterNamespace"),n=a.getOpt("query");"function"==typeof n&&(n=n(a.fileObj,a)),i.each(n,(function(e,n){t.push([encodeURIComponent(r+e),encodeURIComponent(n)].join("="))})),t.push([r+a.getOpt("chunkNumberParameterName"),encodeURIComponent(a.offset+1)].join("=")),t.push([r+a.getOpt("chunkSizeParameterName"),encodeURIComponent(a.getOpt("chunkSize"))].join("=")),t.push([r+a.getOpt("currentChunkSizeParameterName"),encodeURIComponent(a.endByte-a.startByte)].join("=")),t.push([r+a.getOpt("totalSizeParameterName"),encodeURIComponent(a.fileObjSize)].join("=")),t.push([r+a.getOpt("typeParameterName"),encodeURIComponent(a.fileObjType)].join("=")),t.push([r+a.getOpt("identifierParameterName"),encodeURIComponent(a.fileObj.uniqueIdentifier)].join("=")),t.push([r+a.getOpt("fileNameParameterName"),encodeURIComponent(a.fileObj.fileName)].join("=")),t.push([r+a.getOpt("relativePathParameterName"),encodeURIComponent(a.fileObj.relativePath)].join("=")),t.push([r+a.getOpt("totalChunksParameterName"),encodeURIComponent(a.fileObj.chunks.length)].join("=")),a.xhr.open(a.getOpt("testMethod"),i.getTarget(t)),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var o=a.getOpt("headers");"function"==typeof o&&(o=o(a.fileObj,a)),i.each(o,(function(e,t){a.xhr.setRequestHeader(e,t)})),a.xhr.send(null)},a.preprocessFinished=function(){a.preprocessState=2,a.send()},a.send=function(){var e=a.getOpt("preprocess");if("function"==typeof e)switch(a.preprocessState){case 0:return a.preprocessState=1,void e(a);case 1:return}if(!a.getOpt("testChunks")||a.tested){a.xhr=new XMLHttpRequest,a.xhr.upload.addEventListener("progress",(function(e){new Date-a.lastProgressCallback>1e3*a.getOpt("throttleProgressCallbacks")&&(a.callback("progress"),a.lastProgressCallback=new Date),a.loaded=e.loaded||0}),!1),a.loaded=0,a.pendingRetry=!1,a.callback("progress");var t=function(e){var t=a.status();if("success"==t||"error"==t)a.callback(t,a.message()),a.resumableObj.uploadNextChunk();else{a.callback("retry",a.message()),a.abort(),a.retries++;var r=a.getOpt("chunkRetryInterval");void 0!==r?(a.pendingRetry=!0,setTimeout(a.send,r)):a.send()}};a.xhr.addEventListener("load",t,!1),a.xhr.addEventListener("error",t,!1),a.xhr.addEventListener("timeout",t,!1);var r={};r[a.getOpt("chunkNumberParameterName")]=a.offset+1,r[a.getOpt("chunkSizeParameterName")]=a.getOpt("chunkSize"),r[a.getOpt("currentChunkSizeParameterName")]=a.endByte-a.startByte,r[a.getOpt("totalSizeParameterName")]=a.fileObjSize,r[a.getOpt("typeParameterName")]=a.fileObjType,r[a.getOpt("identifierParameterName")]=a.fileObj.uniqueIdentifier,r[a.getOpt("fileNameParameterName")]=a.fileObj.fileName,r[a.getOpt("relativePathParameterName")]=a.fileObj.relativePath,r[a.getOpt("totalChunksParameterName")]=a.fileObj.chunks.length;var n=a.getOpt("query");"function"==typeof n&&(n=n(a.fileObj,a)),i.each(n,(function(e,t){r[e]=t}));var o=a.fileObj.file.slice?"slice":a.fileObj.file.mozSlice?"mozSlice":a.fileObj.file.webkitSlice?"webkitSlice":"slice",s=a.fileObj.file[o](a.startByte,a.endByte),u=null,l=a.getOpt("target"),c=a.getOpt("parameterNamespace");if("octet"===a.getOpt("method")){u=s;var f=[];i.each(r,(function(e,t){f.push([encodeURIComponent(c+e),encodeURIComponent(t)].join("="))})),l=i.getTarget(f)}else u=new FormData,i.each(r,(function(e,t){u.append(c+e,t)})),u.append(c+a.getOpt("fileParameterName"),s);var p=a.getOpt("uploadMethod");a.xhr.open(p,l),"octet"===a.getOpt("method")&&a.xhr.setRequestHeader("Content-Type","binary/octet-stream"),a.xhr.timeout=a.getOpt("xhrTimeout"),a.xhr.withCredentials=a.getOpt("withCredentials");var d=a.getOpt("headers");"function"==typeof d&&(d=d(a.fileObj,a)),i.each(d,(function(e,t){a.xhr.setRequestHeader(e,t)})),a.xhr.send(u)}else a.test()},a.abort=function(){a.xhr&&a.xhr.abort(),a.xhr=null},a.status=function(){return a.pendingRetry?"uploading":a.xhr?a.xhr.readyState<4?"uploading":200==a.xhr.status||201==a.xhr.status?"success":i.contains(a.getOpt("permanentErrors"),a.xhr.status)||a.retries>=a.getOpt("maxChunkRetries")?"error":(a.abort(),"pending"):"pending"},a.message=function(){return a.xhr?a.xhr.responseText:""},a.progress=function(e){void 0===e&&(e=!1);var t=e?(a.endByte-a.startByte)/a.fileObjSize:1;if(a.pendingRetry)return 0;switch(a.xhr&&a.xhr.status||(t*=.95),a.status()){case"success":case"error":return 1*t;case"pending":return 0*t;default:return a.loaded/(a.endByte-a.startByte)*t}},this}if(!(this instanceof e))return new e(t);if(this.version=1,this.support=!("undefined"==typeof File||"undefined"==typeof Blob||"undefined"==typeof FileList||!Blob.prototype.webkitSlice&&!Blob.prototype.mozSlice&&!Blob.prototype.slice),!this.support)return!1;var a=this;a.files=[],a.defaults={chunkSize:1048576,forceChunkSize:!1,simultaneousUploads:3,fileParameterName:"file",chunkNumberParameterName:"resumableChunkNumber",chunkSizeParameterName:"resumableChunkSize",currentChunkSizeParameterName:"resumableCurrentChunkSize",totalSizeParameterName:"resumableTotalSize",typeParameterName:"resumableType",identifierParameterName:"resumableIdentifier",fileNameParameterName:"resumableFilename",relativePathParameterName:"resumableRelativePath",totalChunksParameterName:"resumableTotalChunks",throttleProgressCallbacks:.5,query:{},headers:{},preprocess:null,method:"multipart",uploadMethod:"POST",testMethod:"GET",prioritizeFirstAndLastChunk:!1,target:"/",parameterNamespace:"",testChunks:!0,generateUniqueIdentifier:null,getTarget:null,maxChunkRetries:void 0,chunkRetryInterval:void 0,permanentErrors:[400,404,415,500,501],maxFiles:void 0,withCredentials:!1,xhrTimeout:0,clearInput:!0,maxFilesErrorCallback:function(e,t){var r=a.getOpt("maxFiles");alert("Please upload no more than "+r+" file"+(1===r?"":"s")+" at a time.")},minFileSize:1,minFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too small, please upload files larger than "+i.formatSize(a.getOpt("minFileSize"))+".")},maxFileSize:void 0,maxFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too large, please upload files less than "+i.formatSize(a.getOpt("maxFileSize"))+".")},fileType:[],fileTypeErrorCallback:function(e,t){alert(e.fileName||e.name+" has type not allowed, please upload files of type "+a.getOpt("fileType")+".")}},a.opts=t||{},a.getOpt=function(t){var a=this;if(t instanceof Array){var o={};return i.each(t,(function(e){o[e]=a.getOpt(e)})),o}if(a instanceof n){if(void 0!==a.opts[t])return a.opts[t];a=a.fileObj}if(a instanceof r){if(void 0!==a.opts[t])return a.opts[t];a=a.resumableObj}return a instanceof e?void 0!==a.opts[t]?a.opts[t]:a.defaults[t]:void 0},a.events=[],a.on=function(e,t){a.events.push(e.toLowerCase(),t)},a.fire=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);var r=e[0].toLowerCase();for(t=0;t<=a.events.length;t+=2)a.events[t]==r&&a.events[t+1].apply(a,e.slice(1)),"catchall"==a.events[t]&&a.events[t+1].apply(null,e);"fileerror"==r&&a.fire("error",e[2],e[1]),"fileprogress"==r&&a.fire("progress")};var i={stopEvent:function(e){e.stopPropagation(),e.preventDefault()},each:function(e,t){if(void 0!==e.length){for(var r=0;r<e.length;r++)if(!1===t(e[r]))return}else for(r in e)if(!1===t(r,e[r]))return},generateUniqueIdentifier:function(e){var t=a.getOpt("generateUniqueIdentifier");if("function"==typeof t)return t(e);var r=e.webkitRelativePath||e.fileName||e.name;return e.size+"-"+r.replace(/[^0-9a-zA-Z_-]/gim,"")},contains:function(e,t){var r=!1;return i.each(e,(function(e){return e!=t||(r=!0,!1)})),r},formatSize:function(e){return 1024>e?e+" bytes":1048576>e?(e/1024).toFixed(0)+" KB":1073741824>e?(e/1024/1024).toFixed(1)+" MB":(e/1024/1024/1024).toFixed(1)+" GB"},getTarget:function(e){var t=a.getOpt("target");return"function"==typeof t?t(e):(t+=t.indexOf("?")<0?"?":"&")+e.join("&")}},o=function(e){i.stopEvent(e),e.dataTransfer&&e.dataTransfer.items?u(e.dataTransfer.items,e):e.dataTransfer&&e.dataTransfer.files&&u(e.dataTransfer.files,e)},s=function(e){e.preventDefault()},u=function(e,t,r,n){r||(r={total:0,files:[],event:t}),l(e.length,r);for(var a=0;a<e.length;a++){var i,o,s=e[a];if(s.isFile||s.isDirectory)i=s;else if(s.getAsEntry)i=s.getAsEntry();else{if(!s.webkitGetAsEntry){if("function"==typeof s.getAsFile){c(s.getAsFile(),r,n);continue}if(File&&s instanceof File){c(s,r,n);continue}l(-1,r);continue}i=s.webkitGetAsEntry()}if(i){if(i.isFile)i.file((function(e){c(e,r,n)}),(function(e){console.warn(e)}));else if(i.isDirectory){o=i.createReader();var f=[],p=function(e){o.readEntries((function(n){if(n.length>0){for(var a=0;a<n.length;a++)f.push(n[a]);p(i.fullPath)}else u(f,t,r,e),l(-1,r)}),(function(e){l(-1,r),console.warn(e)}))};p(i.fullPath)}}else l(-1,r)}},l=function(e,t){t.total+=e,t.files.length===t.total&&f(t.files,t.event)},c=function(e,t,r){r&&(e.relativePath=r+"/"+e.name),t.files.push(e),t.files.length===t.total&&f(t.files,t.event)},f=function(e,t){var n=0,o=a.getOpt(["maxFiles","minFileSize","maxFileSize","maxFilesErrorCallback","minFileSizeErrorCallback","maxFileSizeErrorCallback","fileType","fileTypeErrorCallback"]);if(void 0!==o.maxFiles&&o.maxFiles<e.length+a.files.length){if(1!==o.maxFiles||1!==a.files.length||1!==e.length)return o.maxFilesErrorCallback(e,n++),!1;a.removeFile(a.files[0])}var s=[];i.each(e,(function(e){function u(n){a.getFromUniqueIdentifier(n)||function(){e.uniqueIdentifier=n;var i=new r(a,e,n);a.files.push(i),s.push(i),i.container=void 0!==t?t.srcElement:null,window.setTimeout((function(){a.fire("fileAdded",i,t)}),0)}()}var l=e.name;if(o.fileType.length>0){var c=!1;for(var f in o.fileType){var p="."+o.fileType[f];if(-1!==l.indexOf(p,l.length-p.length)){c=!0;break}}if(!c)return o.fileTypeErrorCallback(e,n++),!1}if(void 0!==o.minFileSize&&e.size<o.minFileSize)return o.minFileSizeErrorCallback(e,n++),!1;if(void 0!==o.maxFileSize&&e.size>o.maxFileSize)return o.maxFileSizeErrorCallback(e,n++),!1;var d=i.generateUniqueIdentifier(e);d&&"function"==typeof d.done&&"function"==typeof d.fail?d.done((function(e){u(e)})).fail((function(){u()})):u(d)})),window.setTimeout((function(){a.fire("filesAdded",s)}),0)};return a.uploadNextChunk=function(){var e=!1;if(a.getOpt("prioritizeFirstAndLastChunk")&&(i.each(a.files,(function(t){return t.chunks.length&&"pending"==t.chunks[0].status()&&0===t.chunks[0].preprocessState?(t.chunks[0].send(),e=!0,!1):t.chunks.length>1&&"pending"==t.chunks[t.chunks.length-1].status()&&0===t.chunks[t.chunks.length-1].preprocessState?(t.chunks[t.chunks.length-1].send(),e=!0,!1):void 0})),e))return!0;if(i.each(a.files,(function(t){return!1===t.isPaused()&&i.each(t.chunks,(function(t){return"pending"==t.status()&&0===t.preprocessState?(t.send(),e=!0,!1):void 0})),!e&&void 0})),e)return!0;var t=!1;return i.each(a.files,(function(e){return e.isComplete()?void 0:(t=!0,!1)})),t||a.fire("complete"),!1},a.assignBrowse=function(e,t){void 0===e.length&&(e=[e]),i.each(e,(function(e){var r;"INPUT"===e.tagName&&"file"===e.type?r=e:((r=document.createElement("input")).setAttribute("type","file"),r.style.display="none",e.addEventListener("click",(function(){r.style.opacity=0,r.style.display="block",r.focus(),r.click(),r.style.display="none"}),!1),e.appendChild(r));var n=a.getOpt("maxFiles");void 0===n||1!=n?r.setAttribute("multiple","multiple"):r.removeAttribute("multiple"),t?r.setAttribute("webkitdirectory","webkitdirectory"):r.removeAttribute("webkitdirectory"),r.addEventListener("change",(function(e){f(e.target.files,e),a.getOpt("clearInput")&&(e.target.value="")}),!1)}))},a.assignDrop=function(e){void 0===e.length&&(e=[e]),i.each(e,(function(e){e.addEventListener("dragover",s,!1),e.addEventListener("dragenter",s,!1),e.addEventListener("drop",o,!1)}))},a.unAssignDrop=function(e){void 0===e.length&&(e=[e]),i.each(e,(function(e){e.removeEventListener("dragover",s),e.removeEventListener("dragenter",s),e.removeEventListener("drop",o)}))},a.isUploading=function(){var e=!1;return i.each(a.files,(function(t){return t.isUploading()?(e=!0,!1):void 0})),e},a.upload=function(){if(!a.isUploading()){a.fire("uploadStart");for(var e=1;e<=a.getOpt("simultaneousUploads");e++)a.uploadNextChunk()}},a.pause=function(){i.each(a.files,(function(e){e.abort()})),a.fire("pause")},a.cancel=function(){a.fire("beforeCancel");for(var e=a.files.length-1;e>=0;e--)a.files[e].cancel();a.fire("cancel")},a.progress=function(){var e=0,t=0;return i.each(a.files,(function(r){e+=r.progress()*r.size,t+=r.size})),t>0?e/t:0},a.addFile=function(e,t){f([e],t)},a.removeFile=function(e){for(var t=a.files.length-1;t>=0;t--)a.files[t]===e&&a.files.splice(t,1)},a.getFromUniqueIdentifier=function(e){var t=!1;return i.each(a.files,(function(r){r.uniqueIdentifier==e&&(t=r)})),t},a.getSize=function(){var e=0;return i.each(a.files,(function(t){e+=t.size})),e},a.handleDropEvent=function(e){o(e)},a.handleChangeEvent=function(e){f(e.target.files,e),e.target.value=""},this};"undefined"!=typeof module?module.exports=e:"function"==typeof define&&define.amd?define((function(){return e})):window.Resumable=e}(),function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}((function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,n=e(r);if(!n.is("[type=submit],[type=image]")){var a=n.closest("[type=submit]");if(0===a.length)return;r=a[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=n.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout((function(){i.clk=i.clk_x=i.clk_y=null}),100)}function n(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var a={};a.fileapi=void 0!==e("<input type='file'/>").get(0).files,a.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){function a(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(e){n("cannot get iframe.contentWindow document: "+e)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){n("cannot get iframe.contentDocument: "+r),t=e.document}return t}function s(){var t=l.attr2("target"),r=l.attr2("action"),i=l.attr("enctype")||l.attr("encoding")||"multipart/form-data";O.setAttribute("target",h),(!o||/post/i.test(o))&&O.setAttribute("method","POST"),r!=p.url&&O.setAttribute("action",p.url),p.skipEncodingOverride||o&&!/post/i.test(o)||l.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),p.timeout&&(S=setTimeout((function(){k=!0,u(j)}),p.timeout));var s=[];try{if(p.extraData)for(var c in p.extraData)p.extraData.hasOwnProperty(c)&&s.push(e.isPlainObject(p.extraData[c])&&p.extraData[c].hasOwnProperty("name")&&p.extraData[c].hasOwnProperty("value")?e('<input type="hidden" name="'+p.extraData[c].name+'">').val(p.extraData[c].value).appendTo(O)[0]:e('<input type="hidden" name="'+c+'">').val(p.extraData[c]).appendTo(O)[0]);p.iframeTarget||g.appendTo("body"),v.attachEvent?v.attachEvent("onload",u):v.addEventListener("load",u,!1),setTimeout((function e(){try{var t=a(v).readyState;n("state = "+t),t&&"uninitialized"==t.toLowerCase()&&setTimeout(e,50)}catch(e){n("Server abort: ",e," (",e.name,")"),u(T),S&&clearTimeout(S),S=void 0}}),15);try{O.submit()}catch(e){document.createElement("form").submit.apply(O)}}finally{O.setAttribute("action",r),O.setAttribute("enctype",i),t?O.setAttribute("target",t):l.removeAttr("target"),e(s).remove()}}function u(t){if(!b.aborted&&!E){if((F=a(v))||(n("cannot access response document"),t=T),t===j&&b)return b.abort("timeout"),void w.reject(b,"timeout");if(t==T&&b)return b.abort("server abort"),void w.reject(b,"error","server abort");if(F&&F.location.href!=p.iframeSrc||k){v.detachEvent?v.detachEvent("onload",u):v.removeEventListener("load",u,!1);var r,i="success";try{if(k)throw"timeout";var o="xml"==p.dataType||F.XMLDocument||e.isXMLDoc(F);if(n("isXml="+o),!o&&window.opera&&(null===F.body||!F.body.innerHTML)&&--N)return n("requeing onLoad callback, DOM not available"),void setTimeout(u,250);var s=F.body?F.body:F.documentElement;b.responseText=s?s.innerHTML:null,b.responseXML=F.XMLDocument?F.XMLDocument:F,o&&(p.dataType="xml"),b.getResponseHeader=function(e){return{"content-type":p.dataType}[e.toLowerCase()]},s&&(b.status=Number(s.getAttribute("status"))||b.status,b.statusText=s.getAttribute("statusText")||b.statusText);var l=(p.dataType||"").toLowerCase(),c=/(json|script|text)/.test(l);if(c||p.textarea){var f=F.getElementsByTagName("textarea")[0];if(f)b.responseText=f.value,b.status=Number(f.getAttribute("status"))||b.status,b.statusText=f.getAttribute("statusText")||b.statusText;else if(c){var d=F.getElementsByTagName("pre")[0],h=F.getElementsByTagName("body")[0];d?b.responseText=d.textContent?d.textContent:d.innerText:h&&(b.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==l&&!b.responseXML&&b.responseText&&(b.responseXML=A(b.responseText));try{z=L(b,l,p)}catch(e){i="parsererror",b.error=r=e||i}}catch(e){n("error caught: ",e),i="error",b.error=r=e||i}b.aborted&&(n("upload aborted"),i=null),b.status&&(i=b.status>=200&&b.status<300||304===b.status?"success":"error"),"success"===i?(p.success&&p.success.call(p.context,z,"success",b),w.resolve(b.responseText,"success",b),m&&e.event.trigger("ajaxSuccess",[b,p])):i&&(void 0===r&&(r=b.statusText),p.error&&p.error.call(p.context,b,i,r),w.reject(b,"error",r),m&&e.event.trigger("ajaxError",[b,p,r])),m&&e.event.trigger("ajaxComplete",[b,p]),m&&!--e.active&&e.event.trigger("ajaxStop"),p.complete&&p.complete.call(p.context,b,i),E=!0,p.timeout&&clearTimeout(S),setTimeout((function(){p.iframeTarget?g.attr("src",p.iframeSrc):g.remove(),b.responseXML=null}),100)}}}var c,f,p,m,h,g,v,b,y,x,k,S,O=l[0],w=e.Deferred();if(w.abort=function(e){b.abort(e)},r)for(f=0;f<d.length;f++)c=e(d[f]),i?c.prop("disabled",!1):c.removeAttr("disabled");if((p=e.extend(!0,{},e.ajaxSettings,t)).context=p.context||p,h="jqFormIO"+(new Date).getTime(),p.iframeTarget?(x=(g=e(p.iframeTarget)).attr2("name"))?h=x:g.attr2("name",h):(g=e('<iframe name="'+h+'" src="'+p.iframeSrc+'" />')).css({position:"absolute",top:"-1000px",left:"-1000px"}),v=g[0],b={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";n("aborting upload... "+r),this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(e){}g.attr("src",p.iframeSrc),b.error=r,p.error&&p.error.call(p.context,b,r,t),m&&e.event.trigger("ajaxError",[b,p,r]),p.complete&&p.complete.call(p.context,b,r)}},(m=p.global)&&0==e.active++&&e.event.trigger("ajaxStart"),m&&e.event.trigger("ajaxSend",[b,p]),p.beforeSend&&!1===p.beforeSend.call(p.context,b,p))return p.global&&e.active--,w.reject(),w;if(b.aborted)return w.reject(),w;(y=O.clk)&&((x=y.name)&&!y.disabled&&(p.extraData=p.extraData||{},p.extraData[x]=y.value,"image"==y.type&&(p.extraData[x+".x"]=O.clk_x,p.extraData[x+".y"]=O.clk_y)));var j=1,T=2,C=e("meta[name=csrf-token]").attr("content"),P=e("meta[name=csrf-param]").attr("content");P&&C&&(p.extraData=p.extraData||{},p.extraData[P]=C),p.forceSync?s():setTimeout(s,10);var z,F,E,N=50,A=e.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},D=e.parseJSON||function(e){return window.eval("("+e+")")},L=function(t,r,n){var a=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&a.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),n&&n.dataFilter&&(o=n.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&a.indexOf("json")>=0?o=D(o):("script"===r||!r&&a.indexOf("javascript")>=0)&&e.globalEval(o)),o};return w}if(!this.length)return n("ajaxSubmit: skipping submit process - no element selected"),this;var o,s,u,l=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),o=t.type||this.attr2("method"),(u=(u="string"==typeof(s=t.url||this.attr2("action"))?e.trim(s):"")||window.location.href||"")&&(u=(u.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:u,success:e.ajaxSettings.success,type:o||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var c={};if(this.trigger("form-pre-serialize",[this,t,c]),c.veto)return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&!1===t.beforeSerialize(this,t))return n("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var f=t.traditional;void 0===f&&(f=e.ajaxSettings.traditional);var p,d=[],m=this.formToArray(t.semantic,d);if(t.data&&(t.extraData=t.data,p=e.param(t.data,f)),t.beforeSubmit&&!1===t.beforeSubmit(m,this,t))return n("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[m,this,t,c]),c.veto)return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var h=e.param(m,f);p&&(h=h?h+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+h,t.data=null):t.data=h;var g=[];if(t.resetForm&&g.push((function(){l.resetForm()})),t.clearForm&&g.push((function(){l.clearForm(t.includeHidden)})),!t.dataType&&t.target){var v=t.success||function(){};g.push((function(r){var n=t.replaceTarget?"replaceWith":"html";e(t.target)[n](r).each(v,arguments)}))}else t.success&&g.push(t.success);if(t.success=function(e,r,n){for(var a=t.context||this,i=0,o=g.length;o>i;i++)g[i].apply(a,[e,r,n||l,l])},t.error){var b=t.error;t.error=function(e,r,n){var a=t.context||this;b.apply(a,[e,r,n,l])}}if(t.complete){var y=t.complete;t.complete=function(e,r){var n=t.context||this;y.apply(n,[e,r,l])}}var x=e("input[type=file]:enabled",this).filter((function(){return""!==e(this).val()})).length>0,k="multipart/form-data",S=l.attr("enctype")==k||l.attr("encoding")==k,O=a.fileapi&&a.formdata;n("fileAPI :"+O);var w,j=(x||S)&&!O;!1!==t.iframe&&(t.iframe||j)?t.closeKeepAlive?e.get(t.closeKeepAlive,(function(){w=r(m)})):w=r(m):w=(x||S)&&O?function(r){for(var n=new FormData,a=0;a<r.length;a++)n.append(r[a].name,r[a].value);if(t.extraData){var i=function(r){var n,a,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(n=0;o>n;n++)i[n]=i[n].replace(/\+/g," "),a=i[n].split("="),s.push([decodeURIComponent(a[0]),decodeURIComponent(a[1])]);return s}(t.extraData);for(a=0;a<i.length;a++)i[a]&&n.append(i[a][0],i[a][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:o||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",(function(e){var r=0,n=e.loaded||e.position,a=e.total;e.lengthComputable&&(r=Math.ceil(n/a*100)),t.uploadProgress(e,n,a,r)}),!1),r}),s.data=null;var u=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,u&&u.call(this,e,r)},e.ajax(s)}(m):e.ajax(t),l.removeData("jqxhr").data("jqxhr",w);for(var T=0;T<d.length;T++)d[T]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(a){if((a=a||{}).delegation=a.delegation&&e.isFunction(e.fn.on),!a.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(n("DOM not ready, queuing ajaxForm"),e((function(){e(i.s,i.c).ajaxForm(a)})),this):(n("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return a.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,a,t).on("click.form-plugin",this.selector,a,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",a,t).bind("click.form-plugin",a,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var n=[];if(0===this.length)return n;var i,o,s,u,l,c,f,p,d=this[0],m=this.attr("id"),h=t?d.getElementsByTagName("*"):d.elements;if(h&&!/MSIE [678]/.test(navigator.userAgent)&&(h=e(h).get()),m&&((i=e(':input[form="'+m+'"]').get()).length&&(h=(h||[]).concat(i))),!h||!h.length)return n;for(o=0,f=h.length;f>o;o++)if((u=(c=h[o]).name)&&!c.disabled)if(t&&d.clk&&"image"==c.type)d.clk==c&&(n.push({name:u,value:e(c).val(),type:c.type}),n.push({name:u+".x",value:d.clk_x},{name:u+".y",value:d.clk_y}));else if((l=e.fieldValue(c,!0))&&l.constructor==Array)for(r&&r.push(c),s=0,p=l.length;p>s;s++)n.push({name:u,value:l[s]});else if(a.fileapi&&"file"==c.type){r&&r.push(c);var g=c.files;if(g.length)for(s=0;s<g.length;s++)n.push({name:u,value:g[s],type:c.type});else n.push({name:u,value:"",type:c.type})}else null!=l&&(r&&r.push(c),n.push({name:u,value:l,type:c.type,required:c.required}));if(!t&&d.clk){var v=e(d.clk),b=v[0];(u=b.name)&&!b.disabled&&"image"==b.type&&(n.push({name:u,value:v.val()}),n.push({name:u+".x",value:d.clk_x},{name:u+".y",value:d.clk_y}))}return n},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each((function(){var n=this.name;if(n){var a=e.fieldValue(this,t);if(a&&a.constructor==Array)for(var i=0,o=a.length;o>i;i++)r.push({name:n,value:a[i]});else null!=a&&r.push({name:this.name,value:a})}})),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],n=0,a=this.length;a>n;n++){var i=this[n],o=e.fieldValue(i,t);null==o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var n=t.name,a=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!n||t.disabled||"reset"==a||"button"==a||("checkbox"==a||"radio"==a)&&!t.checked||("submit"==a||"image"==a)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,l="select-one"==a,c=l?o+1:u.length,f=l?o:0;c>f;f++){var p=u[f];if(p.selected){var d=p.value;if(d||(d=p.attributes&&p.attributes.value&&!p.attributes.value.specified?p.text:p.value),l)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each((function(){e("input,select,textarea",this).clearFields(t)}))},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each((function(){var n=this.type,a=this.tagName.toLowerCase();r.test(n)||"textarea"==a?this.value="":"checkbox"==n||"radio"==n?this.checked=!1:"select"==a?this.selectedIndex=-1:"file"==n?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(!0===t&&/hidden/.test(n)||"string"==typeof t&&e(this).is(t))&&(this.value="")}))},e.fn.resetForm=function(){return this.each((function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()}))},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each((function(){this.disabled=!e}))},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each((function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var n=e(this).parent("select");t&&n[0]&&"select-one"==n[0].type&&n.find("option").selected(!1),this.selected=t}}))},e.fn.ajaxSubmit.debug=!1})),function(){var e={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser",this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version",this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var r=e[t].string,n=e[t].prop;if(this.versionSearchString=e[t].versionSearch||e[t].identity,r){if(-1!=r.indexOf(e[t].subString))return e[t].identity}else if(n)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(-1!=t)return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};e.init(),window.$.client={os:e.OS,browser:e.browser}}();