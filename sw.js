var GAS='https://script.google.com/macros/s/AKfycbxJCoiCFZpZ3gBwuCD4rOfxBCs--_HPSydqoFfjqNs0szgqO-CEOpIbtwSkzXmyCzPzzQ/exec',TITLE='ضيافة السبتيّة';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
function hid(s){return crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)).then(function(b){return Array.from(new Uint8Array(b)).map(function(x){return (x+256).toString(16).slice(1);}).join('').slice(0,24);});}
self.addEventListener('push',function(e){e.waitUntil(self.registration.pushManager.getSubscription().then(function(s){return hid(s.endpoint);}).then(function(id){return fetch(GAS+'?note='+id+'&t='+Date.now()).then(function(r){return r.json();});}).catch(function(){return {};}).then(function(j){
  return self.registration.showNotification(j.t||TITLE,{body:j.b||'اضغط لعرض جدول الضيافة',icon:'icon-192.png',badge:'icon-192.png',lang:'ar',dir:'rtl',tag:'dhf',renotify:true});}));});
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(function(ws){for(var i=0;i<ws.length;i++){if('focus' in ws[i])return ws[i].focus();}return self.clients.openWindow(self.registration.scope);}));});
