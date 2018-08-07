/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/ 	
/******/ 	function hotDisposeChunk(chunkId) { //eslint-disable-line no-unused-vars
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "61afe65db6bb49bf9f87"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/***/ (function(module, exports) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"}}

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/react-intersection-observer/dist/react-intersection-observer.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__("invariant");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);



var INSTANCE_MAP = new Map();
var OBSERVER_MAP = new Map();

/**
 * Monitor element, and trigger callback when element becomes visible
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be visible before triggering
 * @param options.root {HTMLElement} It should have a unique id or data-intersection-id in order for the Observer to reused.
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 * @param rootId {String} Unique identifier for the root element, to enable reusing the IntersectionObserver
 */
function observe(element, callback) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    threshold: 0
  };
  var rootId = arguments[3];
  var root = options.root,
      rootMargin = options.rootMargin;

  var threshold = options.threshold || 0;
  if (!element || !callback) return;
  var observerId = rootMargin ? threshold.toString() + "_" + rootMargin : "" + threshold.toString();

  if (root) {
    observerId = rootId ? rootId + "_" + observerId : null;
  }

  var observerInstance = observerId ? OBSERVER_MAP.get(observerId) : null;
  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
  }

  var instance = {
    callback: callback,
    visible: false,
    options: options,
    observerId: observerId,
    observer: !observerId ? observerInstance : undefined
  };

  INSTANCE_MAP.set(element, instance);

  observerInstance.observe(element);

  return instance;
}

/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {HTMLElement}
 */
function unobserve(element) {
  if (!element) return;
  var instance = INSTANCE_MAP.get(element);

  if (instance) {
    var _observerId = instance.observerId,
        _observer = instance.observer;

    var observerInstance = _observerId ? OBSERVER_MAP.get(_observerId) : _observer;

    if (observerInstance) {
      observerInstance.unobserve(element);
    }

    // Check if we are still observing any elements with the same threshold.
    var itemsLeft = false;
    if (_observerId) {
      INSTANCE_MAP.forEach(function (item, key) {
        if (item && item.observerId === _observerId && key !== element) {
          itemsLeft = true;
        }
      });
    }

    if (observerInstance && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observerInstance.disconnect();
      OBSERVER_MAP.delete(_observerId);
    }

    // Remove reference to element
    INSTANCE_MAP.delete(element);
  }
}

function onChange(changes) {
  changes.forEach(function (intersection) {
    var isIntersecting = intersection.isIntersecting,
        intersectionRatio = intersection.intersectionRatio,
        target = intersection.target;

    var instance = INSTANCE_MAP.get(target);

    // Firefox can report a negative intersectionRatio when scrolling.
    if (instance && intersectionRatio >= 0) {
      var _options = instance.options;

      var _inView = false;

      if (Array.isArray(_options.threshold)) {
        // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
        _inView = _options.threshold.some(function (threshold) {
          return instance.visible ? intersectionRatio > threshold : intersectionRatio >= threshold;
        });
      } else if (_options.threshold !== undefined) {
        // Trigger on 0 ratio only when not visible. This is fallback for browsers without isIntersecting support
        _inView = instance.visible ? intersectionRatio > _options.threshold : intersectionRatio >= _options.threshold;
      }

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        _inView = _inView && isIntersecting;
      }

      instance.visible = _inView;
      instance.callback(_inView);
    }
  });
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <Observer>
 {({inView, ref}) => (
   <h1 ref={ref}>{`${inView}`}</h1>
 )}
 </Observer>
 */
var Observer = function (_React$Component) {
  inherits(Observer, _React$Component);

  function Observer() {
    var _temp, _this, _ret;

    classCallCheck(this, Observer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      inView: false
    }, _this.node = null, _this.handleNode = function (node) {
      if (_this.node) unobserve(_this.node);
      _this.node = node;
      _this.observeNode();
    }, _this.handleChange = function (inView) {
      _this.setState({ inView: inView });
      if (_this.props.onChange) {
        _this.props.onChange(inView);
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Observer.prototype.componentDidMount = function componentDidMount() {
    if (true) {
      if (this.props.hasOwnProperty('render')) {
        console.warn('react-intersection-observer: "render" is deprecated, and should be replaced with "children"', this.node);
      }
      __WEBPACK_IMPORTED_MODULE_1_invariant___default()(this.node, 'react-intersection-observer: No DOM node found. Make sure you forward "ref" to the root DOM element you want to observe.');
    }
  };

  Observer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If a IntersectionObserver option changed, reinit the observer
    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold) {
      unobserve(this.node);
      this.observeNode();
    }

    if (prevState.inView !== this.state.inView) {
      if (this.state.inView && this.props.triggerOnce) {
        unobserve(this.node);
        this.node = null;
      }
    }
  };

  Observer.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.node) {
      unobserve(this.node);
      this.node = null;
    }
  };

  Observer.prototype.observeNode = function observeNode() {
    if (!this.node) return;
    var _props = this.props,
        threshold = _props.threshold,
        root = _props.root,
        rootMargin = _props.rootMargin,
        rootId = _props.rootId;

    observe(this.node, this.handleChange, {
      threshold: threshold,
      root: root,
      rootMargin: rootMargin
    }, rootId);
  };

  Observer.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        render = _props2.render,
        tag = _props2.tag,
        triggerOnce = _props2.triggerOnce,
        threshold = _props2.threshold,
        root = _props2.root,
        rootId = _props2.rootId,
        rootMargin = _props2.rootMargin,
        props = objectWithoutProperties(_props2, ['children', 'render', 'tag', 'triggerOnce', 'threshold', 'root', 'rootId', 'rootMargin']);
    var inView = this.state.inView;

    var renderMethod = children || render;

    if (typeof renderMethod === 'function') {
      return renderMethod({ inView: inView, ref: this.handleNode });
    }

    return Object(__WEBPACK_IMPORTED_MODULE_0_react__["createElement"])(tag || 'div', _extends({ ref: this.handleNode }, props), children);
  };

  return Observer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Observer.defaultProps = {
  threshold: 0,
  triggerOnce: false
};

/* harmony default export */ __webpack_exports__["a"] = (Observer);


/***/ }),

/***/ "./node_modules/react-lazy-images/dist/react-lazy-images.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return h; });
/* unused harmony export ImageState */
/* unused harmony export LazyImageFull */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_intersection_observer__ = __webpack_require__("./node_modules/react-intersection-observer/dist/react-intersection-observer.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_unionize__ = __webpack_require__("./node_modules/unionize/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_unionize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_unionize__);
var o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};var a,i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function c(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]])}return n}!function(e){e.NotAsked="NotAsked",e.Loading="Loading",e.LoadSuccess="LoadSuccess",e.LoadError="LoadError"}(a||(a={}));var u=Object(__WEBPACK_IMPORTED_MODULE_2_unionize__["unionize"])({NotAsked:{},Buffering:{},Loading:{},LoadSuccess:{},LoadError:Object(__WEBPACK_IMPORTED_MODULE_2_unionize__["ofType"])()}),s=Object(__WEBPACK_IMPORTED_MODULE_2_unionize__["unionize"])({ViewChanged:Object(__WEBPACK_IMPORTED_MODULE_2_unionize__["ofType"])(),BufferingEnded:{},LoadSuccess:{},LoadError:Object(__WEBPACK_IMPORTED_MODULE_2_unionize__["ofType"])()}),d=function(e,t){return function(n){var r=g(l(e,t));r.promise.then(function(e){return n.update(s.LoadSuccess({}))}).catch(function(e){e.isCanceled||n.update(s.LoadError({msg:"Failed to load"}))}),n.promiseCache.loading=r}},f=function(e){e.promiseCache.buffering.cancel()},p=function(n){function r(e){var t=n.call(this,e)||this;return t.promiseCache={},t.initialState=u.NotAsked(),t.state=t.initialState,t.update=t.update.bind(t),t}return function(e,t){function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}(r,n),r.reducer=function(e,t,n){return s.match(e,{ViewChanged:function(e){return!0===e.inView?n.src?u.match(t,{NotAsked:function(){return n.debounceDurationMs?{nextState:u.Buffering(),cmd:(e=n.debounceDurationMs,function(t){var n=g(m(e));n.promise.then(function(){return t.update(s.BufferingEnded())}).catch(function(e){}),t.promiseCache.buffering=n})}:{nextState:u.Loading(),cmd:d(n,n.experimentalDecode)};var e},default:function(){return{nextState:t}}}):{nextState:u.LoadSuccess()}:u.match(t,{Buffering:function(){return{nextState:u.NotAsked(),cmd:f}},default:function(){return{nextState:t}}})},BufferingEnded:function(){return{nextState:u.Loading(),cmd:d(n,n.experimentalDecode)}},LoadSuccess:function(){return{nextState:u.LoadSuccess()}},LoadError:function(e){return{nextState:u.LoadError(e)}}})},r.prototype.update=function(e){var t=this,n=r.reducer(e,this.state,this.props),o=n.nextState,a=n.cmd;this.props.debugActions&&("production"==="development"&&console.warn('You are running LazyImage with debugActions="true" in production. This might have performance implications.'),console.log({action:e,prevState:this.state,nextState:o})),this.setState(o,function(){return a&&a(t)})},r.prototype.componentWillUnmount=function(){this.promiseCache.loading&&this.promiseCache.loading.cancel(),this.promiseCache.buffering&&this.promiseCache.buffering.cancel(),this.promiseCache={}},r.prototype.render=function(){var n=this,r=this.props,o=r.children,d=r.loadEagerly,f=r.observerProps,p=c(r,["children","loadEagerly","observerProps","experimentalDecode","debounceDurationMs","debugActions"]);return d?o({imageState:u.LoadSuccess().tag,imageProps:p}):__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_intersection_observer__["a" /* default */],i({rootMargin:"50px 0px",threshold:.01},f,{onChange:function(e){return n.update(s.ViewChanged({inView:e}))}}),function(e){return o({imageState:"Buffering"===n.state.tag?a.Loading:n.state.tag,imageProps:p,ref:e.ref})})},r.displayName="LazyImageFull",r}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component),l=function(e,t){var n=e.src,r=e.srcSet,o=e.alt,a=e.sizes;return void 0===t&&(t=!1),new Promise(function(e,i){var c=new Image;if(r&&(c.srcset=r),o&&(c.alt=o),a&&(c.sizes=a),c.src=n,t&&"decode"in c)return c.decode().then(function(t){return e(t)}).catch(function(e){return i(e)});c.onload=e,c.onerror=i})},m=function(e){return new Promise(function(t){return setTimeout(t,e)})},g=function(e){var t=!1;return{promise:new Promise(function(n,r){e.then(function(e){return t?r({isCanceled:!0}):n(e)}),e.catch(function(e){return r(t?{isCanceled:!0}:e)})}),cancel:function(){t=!0}}},h=function(t){var n=t.actual,r=t.placeholder,o=t.loading,u=t.error,s=c(t,["actual","placeholder","loading","error"]);return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(p,i({},s),function(e){var t=e.imageProps,i=e.ref;switch(e.imageState){case a.NotAsked:return!!r&&r({imageProps:t,ref:i});case a.Loading:return o?o():!!r&&r({imageProps:t,ref:i});case a.LoadSuccess:return n({imageProps:t});case a.LoadError:return u?u():n({imageProps:t})}})};h.displayName="LazyImage";
//# sourceMappingURL=react-lazy-images.es.js.map


/***/ }),

/***/ "./node_modules/unionize/lib/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function unionize(record, config) {
    var _a = config || {}, _b = _a.value, valProp = _b === void 0 ? undefined : _b, _c = _a.tag, tagProp = _c === void 0 ? 'tag' : _c;
    var creators = {};
    var _loop_1 = function (tag) {
        creators[tag] = (function (value) {
            if (value === void 0) { value = {}; }
            return valProp ? (_a = {}, _a[tagProp] = tag, _a[valProp] = value, _a) : __assign({}, value, (_b = {}, _b[tagProp] = tag, _b));
            var _a, _b;
        });
    };
    for (var tag in record) {
        _loop_1(tag);
    }
    var is = {};
    var _loop_2 = function (tag) {
        is[tag] = (function (variant) { return variant[tagProp] === tag; });
    };
    for (var tag in record) {
        _loop_2(tag);
    }
    function evalMatch(variant, cases, defaultCase) {
        if (defaultCase === void 0) { defaultCase = cases.default; }
        var handler = cases[variant[tagProp]];
        return handler ? handler(valProp ? variant[valProp] : variant) : defaultCase(variant);
    }
    var match = function (first, second) {
        return second ? evalMatch(first, second) : function (variant) { return evalMatch(variant, first); };
    };
    var identity = function (x) { return x; };
    var transform = function (first, second) {
        return second
            ? evalMatch(first, second, identity)
            : function (variant) { return evalMatch(variant, first, identity); };
    };
    var as = {};
    var _loop_3 = function (expectedTag) {
        as[expectedTag] = match((_a = {},
            _a[expectedTag] = function (x) { return x; },
            _a.default = function (val) {
                throw new Error("Attempted to cast " + val[tagProp] + " as " + expectedTag);
            },
            _a));
        var _a;
    };
    for (var expectedTag in record) {
        _loop_3(expectedTag);
    }
    return Object.assign({
        is: is,
        as: as,
        match: match,
        transform: transform,
        _Record: record,
    }, creators);
}
exports.unionize = unionize;
/**
 * Creates a pseudo-witness of a given type. That is, it pretends to return a value of
 * type `T` for any `T`, but it's really just returning `undefined`. This white lie
 * allows convenient expression of the value types in the record you pass to `unionize`.
 */
exports.ofType = function () { return undefined; };
exports.default = unionize;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	if(unacceptedModules.length > 0) {
		log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if(!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if(typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if(numberIds)
			log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog = (logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if(shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if(shouldLog(level)) {
		if(level === "info") {
			console.log(msg);
		} else if(level === "warning") {
			console.warn(msg);
		} else if(level === "error") {
			console.error(msg);
		}
	}
};

var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if(true) {
	var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	var log = __webpack_require__("./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if(module.hot.status() === "idle") {
			module.hot.check(true).then(function(updatedModules) {
				if(!updatedModules) {
					if(fromUpdate) log("info", "[HMR] Update applied.");
					return;
				}
				__webpack_require__("./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
				checkForUpdate(true);
			}).catch(function(err) {
				var status = module.hot.status();
				if(["abort", "fail"].indexOf(status) >= 0) {
					log("warning", "[HMR] Cannot apply update.");
					log("warning", "[HMR] " + err.stack || err.message);
					log("warning", "[HMR] You need to restart the application!");
				} else {
					log("warning", "[HMR] Update failed: " + err.stack || err.message);
				}
			});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {
	throw new Error("[HMR] Hot Module Replacement is disabled.");
}

/* WEBPACK VAR INJECTION */}.call(exports, "?300"))

/***/ }),

/***/ "./src/common/components/heading/heading.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".heading {\n  margin: 20px 0px;\n  margin-right: auto;\n  margin-left: 5%;\n  color: #f5a0fd;\n  font-size: 35px;\n  letter-spacing: 2px;\n  font-weight: bold;\n  font-family: 'n';\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/heading/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__heading_css__ = __webpack_require__("./src/common/components/heading/heading.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__heading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__heading_css__);
var _jsxFileName = "/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/components/heading/index.js";



/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var title = _ref.title;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "div",
    { className: "heading", __source: {
        fileName: _jsxFileName,
        lineNumber: 4
      }
    },
    title
  );
});

/***/ }),

/***/ "./src/common/components/list/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_mangacard__ = __webpack_require__("./src/common/components/mangacard/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__("prop-types");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_css__ = __webpack_require__("./src/common/components/list/list.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__list_css__);
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/components/list/index.js';






var List = function List(_ref) {
  var list = _ref.list;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'latest_container', __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    list.map(function (x) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_mangacard__["a" /* default */], { imgUrl: x.im, title: x.t, id: x.i, key: x.i, __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      });
    })
  );
};

var withPropType = Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["setPropTypes"])({
  list: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.array
});

/* harmony default export */ __webpack_exports__["a"] = (withPropType(List));

/***/ }),

/***/ "./src/common/components/list/list.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".latest_container {\n  min-height: 370px;\n  width: 90%;\n  max-width: 1500px;\n  display: flex;\n  flex-direction: row;\n  overflow-y: auto;\n  border-radius: 10px;\n  background-color: #204591;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n  margin: 10px 0px;\n}\n\n.latest_container::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #f5f5f5;\n}\n\n.latest_container::-webkit-scrollbar {\n  height: 4px;\n  background-color: #f5f5f5;\n}\n\n.latest_container::-webkit-scrollbar-thumb {\n  background-color: #cf84fd;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/mangacard/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mangacard_css__ = __webpack_require__("./src/common/components/mangacard/mangacard.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mangacard_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__mangacard_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__placeholder_png__ = __webpack_require__("./src/common/components/mangacard/placeholder.png");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__placeholder_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__placeholder_png__);
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/components/mangacard/index.js';





var BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

var Loader = function Loader(_) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'lds-dual-ring custom', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  });
};

var Mangacard = function Mangacard(_ref) {
  var imgUrl = _ref.imgUrl,
      title = _ref.title,
      id = _ref.id,
      history = _ref.history,
      loading = _ref.loading,
      stopLoader = _ref.stopLoader;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'manga_card', onClick: function onClick(_) {
        return history.replace('/info/' + id);
      }, __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Loader, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', {
      alt: '',
      src: imgUrl ? '' + BASE_URL + imgUrl : __WEBPACK_IMPORTED_MODULE_4__placeholder_png___default.a,
      onLoad: function onLoad(_) {
        return stopLoader(function (_) {
          return false;
        });
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      },
      title
    )
  );
};

var stateful = Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["withState"])('loading', 'stopLoader', true);

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["compose"])(stateful, __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["withRouter"])(Mangacard));

/***/ }),

/***/ "./src/common/components/mangacard/mangacard.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".manga_card {\n  margin: 10px 10px;\n  color: #fbdaf9;\n  letter-spacing: 1px;\n  position: relative;\n  min-width: 200px;\n  cursor: pointer;\n}\n\n.manga_card img {\n  width: 200px;\n  height: 300px;\n  border-radius: 10px;\n}\n\n.custom {\n  position: absolute;\n  top: 35%;\n  left: 35%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/components/mangacard/placeholder.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/placeholder.f83d4416.png";

/***/ }),

/***/ "./src/common/components/nav/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_css__ = __webpack_require__("./src/common/components/nav/nav.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__nav_css__);
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/components/nav/index.js';




/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'nav_container', __source: {
        fileName: _jsxFileName,
        lineNumber: 6
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'nav_left', __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      },
      'Mangaflux'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'nav-menu', __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/', __source: {
            fileName: _jsxFileName,
            lineNumber: 9
          }
        },
        'HOME'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/browse', __source: {
            fileName: _jsxFileName,
            lineNumber: 10
          }
        },
        'BROWSE'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"],
        { to: '/about', __source: {
            fileName: _jsxFileName,
            lineNumber: 11
          }
        },
        'ABOUT'
      )
    )
  );
});

/***/ }),

/***/ "./src/common/components/nav/nav.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".nav_container {\n  width: 90%;\n  margin: 20px;\n  padding: 20px;\n  font-size: 18px;\n  color: #fbdaf9;\n  border-radius: 10px;\n  background-color: #204591;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n}\n\n.nav-menu {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  justify-content: center;\n}\n\n.nav-menu a {\n  cursor: pointer;\n  margin: 0px 25px;\n  font-size: 15px;\n  font-weight: bold;\n  letter-spacing: 2px;\n  color: #fbdaf9;\n  text-decoration: none;\n}\n\n.nav_left {\n  margin-right: auto;\n  font-size: 40px;\n  letter-spacing: 1px;\n  font-family: 'n';\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/browse/browse.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".home_container {\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.browse_manga_container {\n  width: 70%;\n  display: flex;\n  flex-direction: column;\n  border-radius: 10px;\n  background-color: #204591;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n  margin-top: 30px;\n  padding: 25px 40px;\n  overflow-y: auto;\n}\n\n.desc {\n  margin-bottom: 10px;\n  margin-right: 10px;\n}\n\n.not_found {\n  margin: 100px;\n  text-align: center;\n  font-size: 30px;\n  color: #f6aafe;\n}\n\n.browse-loader {\n  margin: 200px;\n}\n\n.not_found img {\n  border-radius: 10px;\n}\n\n.searchbar {\n  margin-top: 20px;\n  width: 50%;\n  background-color: #fff;\n  border: 2px solid #f6aafe;\n  padding: 25px 10px;\n  border-radius: 12px;\n  font-size: 25px;\n  color: #204591;\n  height: 30px;\n  outline: none;\n  text-indent: 10px;\n}\n\n.searchbar::placeholder {\n  color: #204591;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/browse/browse.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("babel-runtime/core-js/object/get-prototype-of");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("babel-runtime/helpers/classCallCheck");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("babel-runtime/helpers/createClass");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("babel-runtime/helpers/possibleConstructorReturn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__("babel-runtime/helpers/inherits");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__browse_css__ = __webpack_require__("./src/common/containers/browse/browse.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__browse_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__browse_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notfound_jpg__ = __webpack_require__("./src/common/containers/browse/notfound.jpg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__notfound_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__notfound_jpg__);





var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/browse/browse.js';




var BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';
var Loader = function Loader(_) {
  return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('div', { className: 'lds-dual-ring browse-loader', __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  });
};

var Browse = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Browse, _React$Component);

  function Browse() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Browse);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Browse.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Browse)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      searchText: ''
    }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Browse, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          smallLoader = _props.smallLoader,
          notFound = _props.notFound,
          fetchedManga = _props.fetchedManga;

      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        { className: 'home_container', __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('textarea', {
          className: 'searchbar',
          placeholder: 'Search Manga',
          value: this.state.searchText,
          onChange: function onChange(e) {
            _this2.setState({ searchText: e.target.value }, function (_) {
              _this2.props.searchManga(_this2.state.searchText);
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 17
          }
        }),
        smallLoader && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(Loader, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 27
          }
        }),
        notFound ? __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'not_found', __source: {
              fileName: _jsxFileName,
              lineNumber: 29
            }
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img', { src: __WEBPACK_IMPORTED_MODULE_7__notfound_jpg___default.a, __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            }
          }),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              }
            },
            'No Results found :('
          )
        ) : fetchedManga && __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          { className: 'browse_manga_container', __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            }
          },
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'div',
            { className: 'title-container', __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              }
            },
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: 'info-meta', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                }
              },
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                  }
                },
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  'div',
                  { className: 'info-title', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 39
                    }
                  },
                  fetchedManga.title
                ),
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                  'div',
                  { className: 'desc', __source: {
                      fileName: _jsxFileName,
                      lineNumber: 40
                    }
                  },
                  fetchedManga.description
                )
              ),
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                { className: 'info-tags', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                  }
                },
                fetchedManga.categories.map(function (x) {
                  return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'div',
                    {
                      __source: {
                        fileName: _jsxFileName,
                        lineNumber: 43
                      }
                    },
                    x
                  );
                })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
              'div',
              { className: 'info-title-image', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 46
                }
              },
              __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('img', { alt: '', src: '' + BASE_URL + fetchedManga.image, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 47
                }
              })
            )
          )
        )
      );
    }
  }]);

  return Browse;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Browse);

/***/ }),

/***/ "./src/common/containers/browse/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__("babel-runtime/core-js/json/stringify");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");








var Search = 'https://mangaflux-api-yrqjezvkxz.now.sh/search';

var fetchManga = function fetchManga(url) {
  return function (action) {
    return __WEBPACK_IMPORTED_MODULE_4_node_fetch___default()(url, {
      method: 'POST',
      body: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()({
        keywords: action.payload.trim().split(' ').map(__WEBPACK_IMPORTED_MODULE_1_ramda__["toLower"])
      })
    }).then(function (res) {
      return res.json();
    }).then(Object(__WEBPACK_IMPORTED_MODULE_5__futils_curried__["a" /* Action */])('FETCHED_MANGA')).catch(function (_) {
      return Object(__WEBPACK_IMPORTED_MODULE_6__futils_actionSpreader__["a" /* default */])('NOT_FOUND');
    });
  };
};

var manga$ = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["compose"])(__WEBPACK_IMPORTED_MODULE_3_most__["fromPromise"], fetchManga(Search));

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_curried__["b" /* Chain */])(manga$), Object(__WEBPACK_IMPORTED_MODULE_5__futils_curried__["d" /* Debounce */])(500), Object(__WEBPACK_IMPORTED_MODULE_2_redux_most__["select"])('SEARCH_MANGA'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/browse/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__browse__ = __webpack_require__("./src/common/containers/browse/browse.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");






var mapStateToProps = function mapStateToProps(state) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_ramda__["pick"])(['fetchedManga', 'smallLoader', 'notFound'], state.browse));
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    searchManga: function searchManga(text) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_4__futils_actionSpreader__["a" /* default */])('SEARCH_MANGA', text));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__browse__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/browse/notfound.jpg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/notfound.d38e43e1.jpg";

/***/ }),

/***/ "./src/common/containers/browse/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");



var ACTION_HANDLERS = {
  FETCHED_MANGA: function FETCHED_MANGA(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      fetchedManga: a.payload,
      smallLoader: false,
      notFound: false
    });
  },
  SHOW_SMALL_LOADER: function SHOW_SMALL_LOADER(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { smallLoader: true, notFound: false });
  },
  NOT_FOUND: function NOT_FOUND(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { smallLoader: false, notFound: true });
  },
  SEARCH_MANGA: function SEARCH_MANGA(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      notFound: false,
      smallLoader: true,
      fetchedManga: null
    });
  }
};

var initialState = {
  fetchedManga: null,
  smallLoader: false,
  notFound: false
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/chapter/chapter.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".chapter_image {\n  margin: 30px 0px;\n  width: 90%;\n}\n\n.chapter_image img {\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/chapter/chapter.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__("babel-runtime/helpers/extends");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_lazy_images__ = __webpack_require__("./node_modules/react-lazy-images/dist/react-lazy-images.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chapter_css__ = __webpack_require__("./src/common/containers/chapter/chapter.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chapter_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__chapter_css__);

var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/chapter/chapter.js';






var BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';
var Loader = function Loader(_) {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: 'lds-dual-ring custom', __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  });
};

var Chapter = function Chapter(_ref) {
  var images = _ref.images;
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    { className: 'home_container', __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    images.map(function (x) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: 'chapter_image', __source: {
            fileName: _jsxFileName,
            lineNumber: 13
          }
        },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_lazy_images__["a" /* LazyImage */], {
          src: '' + BASE_URL + x[1],
          alt: 'Image not available',
          placeholder: function placeholder(_ref2) {
            var imageProps = _ref2.imageProps,
                ref = _ref2.ref;
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { ref: ref, alt: imageProps.alt, style: { width: '100%' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 18
              }
            });
          },
          debounceDurationMs: 300,
          actual: function actual(_ref3) {
            var imageProps = _ref3.imageProps;
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, imageProps, { style: { width: '100%' }, __source: {
                fileName: _jsxFileName,
                lineNumber: 22
              }
            }));
          },
          loading: function loading(_) {
            return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Loader, {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 24
              }
            });
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        })
      );
    })
  );
};

var withLifeCycle = Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["lifecycle"])({
  componentWillMount: function componentWillMount() {
    this.props.fetchChapter(this.props.match.params.chapterId);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["compose"])(withLifeCycle, __WEBPACK_IMPORTED_MODULE_3_react_router_dom__["withRouter"])(Chapter));

/***/ }),

/***/ "./src/common/containers/chapter/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");







var InfoAPI = 'https://mangaflux-api-yrqjezvkxz.now.sh/chapter/';

var fetchInfo = function fetchInfo(_ref) {
  var payload = _ref.payload;
  return __WEBPACK_IMPORTED_MODULE_3_node_fetch___default()(InfoAPI + payload).then(function (res) {
    return res.json();
  });
};

var chapter$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Map */])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["a" /* Action */])('FETCHED_CHAPTER')), __WEBPACK_IMPORTED_MODULE_2_most__["fromPromise"], fetchInfo);

var sendAction$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_OFF'))), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["f" /* Merge */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_ON'))), chapter$);

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["b" /* Chain */])(sendAction$), Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["select"])('FETCH_CHAPTER'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/chapter/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chapter__ = __webpack_require__("./src/common/containers/chapter/chapter.js");





var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('chapter');

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchChapter: function fetchChapter(id) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('FETCH_CHAPTER', id));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__chapter__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/chapter/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__("babel-runtime/helpers/toConsumableArray");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");




var ACTION_HANDLERS = {
  FETCHED_CHAPTER: function FETCHED_CHAPTER(s, a) {
    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, s, {
      images: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(a.payload.images)).reverse()
    });
  }
};

var initialState = {
  images: []
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/home/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");







var Latest = 'https://mangaflux-api-yrqjezvkxz.now.sh/latest/0/20';
var Popular = 'https://mangaflux-api-yrqjezvkxz.now.sh/list/0/20';

var fetchManga = function fetchManga(url) {
  return __WEBPACK_IMPORTED_MODULE_3_node_fetch___default()(url).then(function (res) {
    return res.json();
  });
};

var createAction$ = function createAction$(a) {
  return Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])(a));
};

var manga$ = function manga$(a) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Map */])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["a" /* Action */])(a)), __WEBPACK_IMPORTED_MODULE_2_most__["fromPromise"], fetchManga);
};

var latest$ = manga$('FETCHED_LATEST');
var popular$ = manga$('FETCHED_POPULAR');

var sendAction$ = function sendAction$(l, p) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], createAction$('LOADER_OFF')), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["f" /* Merge */])(latest$(l)), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], popular$(p)), Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["always"])(createAction$('LOADER_ON')));
};

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["b" /* Chain */])(sendAction$(Latest, Popular)), Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["select"])('FETCH_INIT'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/home/home.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".home_container {\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.home_container::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #f5f5f5;\n}\n\n.home_container::-webkit-scrollbar {\n  width: 4px;\n  background-color: #f5f5f5;\n}\n\n.home_container::-webkit-scrollbar-thumb {\n  background-color: #cf84fd;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/home/home.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_list__ = __webpack_require__("./src/common/components/list/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css__ = __webpack_require__("./src/common/containers/home/home.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__home_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_heading__ = __webpack_require__("./src/common/components/heading/index.js");
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/home/home.js';






var withInitData = Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["lifecycle"])({
  componentDidMount: function componentDidMount() {
    this.props.fetchLatest();
    console.log('loaded');
  }
});

var Home = function Home(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'home_container', __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_heading__["a" /* default */], { title: 'Latest', __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_list__["a" /* default */], { list: props.latestList, __source: {
        fileName: _jsxFileName,
        lineNumber: 17
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_heading__["a" /* default */], { title: 'Popular', __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_list__["a" /* default */], { list: props.popularList, __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      }
    })
  );
};

/* harmony default export */ __webpack_exports__["a"] = (withInitData(Home));

/***/ }),

/***/ "./src/common/containers/home/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__("./src/common/containers/home/home.js");





var mapStateToProps = Object(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('home');

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchLatest: function fetchLatest() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('FETCH_INIT'));
    },
    loaderOff: function loaderOff() {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */])('LOADER_OFF'));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__home__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/home/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");



var ACTION_HANDLERS = {
  FETCHED_LATEST: function FETCHED_LATEST(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      latestList: a.payload.data,
      showLoader: false
    });
  },
  FETCHED_POPULAR: function FETCHED_POPULAR(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, {
      popularList: a.payload.data,
      showLoader: false
    });
  },
  LOADER_OFF: function LOADER_OFF(s, _a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { showLoader: false });
  },
  LOADER_ON: function LOADER_ON(s, _a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { showLoader: true });
  }
};

var initialState = {
  latestList: [],
  popularList: [],
  showLoader: false
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/info/epic.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__futils_curried__ = __webpack_require__("./src/common/futils/curried.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");







var InfoAPI = 'https://mangaflux-api-yrqjezvkxz.now.sh/mangaInfo/';

var fetchInfo = function fetchInfo(_ref) {
  var payload = _ref.payload;
  return __WEBPACK_IMPORTED_MODULE_3_node_fetch___default()(InfoAPI + payload).then(function (res) {
    return res.json();
  });
};

var info$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["e" /* Map */])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["a" /* Action */])('FETCHED_INFO')), __WEBPACK_IMPORTED_MODULE_2_most__["fromPromise"], fetchInfo);

var sendAction$ = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["c" /* Concat */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_OFF'))), Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["f" /* Merge */])(__WEBPACK_IMPORTED_MODULE_0_ramda__["__"], Object(__WEBPACK_IMPORTED_MODULE_2_most__["of"])(Object(__WEBPACK_IMPORTED_MODULE_5__futils_actionSpreader__["a" /* default */])('LOADER_ON'))), info$);

var fetchData = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["compose"])(Object(__WEBPACK_IMPORTED_MODULE_4__futils_curried__["b" /* Chain */])(sendAction$), Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["select"])('FETCH_INFO'));

/* harmony default export */ __webpack_exports__["a"] = (fetchData);

/***/ }),

/***/ "./src/common/containers/info/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__info__ = __webpack_require__("./src/common/containers/info/info.js");





var mapStateToProps = function mapStateToProps(state) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, state.info, Object(__WEBPACK_IMPORTED_MODULE_2_ramda__["pick"])(['showLoader'], state.home));
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchInfo: function fetchInfo(id) {
      return dispatch({ type: 'FETCH_INFO', payload: id });
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__info__["a" /* default */]));

/***/ }),

/***/ "./src/common/containers/info/info.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".info_container {\n  width: 70%;\n  height: 75%;\n  display: flex;\n  flex-direction: column;\n  border-radius: 10px;\n  background-color: #204591;\n  box-shadow: 5px 5px 23px rgba(0, 0, 0, 0.2);\n  margin-top: 10px;\n  padding: 25px 40px;\n  overflow-y: auto;\n}\n\n.blur {\n  filter: blur(15px);\n}\n\n.info_container::-webkit-scrollbar-track {\n  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n  background-color: #f5f5f5;\n}\n\n.info_container::-webkit-scrollbar {\n  width: 4px;\n  background-color: #f5f5f5;\n}\n\n.info_container::-webkit-scrollbar-thumb {\n  background-color: #cf84fd;\n}\n\n.info-title-image {\n  align-self: center;\n}\n\n.title-container {\n  display: flex;\n  flex-direction: row;\n  width: 100%;\n  justify-content: space-between;\n}\n\n.info-title {\n  color: #fce5ff;\n  font-family: 'n';\n  font-size: 40px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n}\n\n.info-meta {\n  font-size: 22px;\n  color: #fbdcfc;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n\n.info-meta-data {\n  margin: 5px 0px;\n}\n\n.info-tags {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n\n.info-tags div {\n  margin-right: 10px;\n  margin-top: 10px;\n  color: #f6aafe;\n  border: 2px solid #f6aafe;\n  padding: 5px 10px;\n  border-radius: 12px;\n}\n\n.info-description {\n  margin: 30px 0px;\n  font-size: 20px;\n  line-height: 27px;\n  letter-spacing: 1px;\n  color: #fbdcfc;\n}\n\n.info-description-title {\n  font-size: 25px;\n  color: #fce5ff;\n  margin-bottom: 10px;\n}\n\n.chapter {\n  display: flex;\n  flex-direction: row;\n  font-size: 20px;\n  color: #fbdcfc;\n  align-items: center;\n  padding: 5px 10px;\n  cursor: pointer;\n  transition: all 0.1s linear;\n}\n\n.back-button div:hover {\n  background-color: #f6aafe;\n  color: #204591;\n  cursor: pointer;\n}\n\n.chapter:hover {\n  background-color: #f6aafe;\n  color: #204591;\n  border-radius: 12px;\n}\n\n.chapter_no {\n  margin: 10px 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/info/info.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose__ = __webpack_require__("recompose");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recompose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_recompose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__info_css__ = __webpack_require__("./src/common/containers/info/info.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__info_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__info_css__);
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/info/info.js';




var BASE_URL = 'http://cdn.mangaeden.com/mangasimg/';

var Info = function Info(_ref) {
  var _ref$currentInfo = _ref.currentInfo,
      title = _ref$currentInfo.title,
      image = _ref$currentInfo.image,
      artist = _ref$currentInfo.artist,
      author = _ref$currentInfo.author,
      chapters_len = _ref$currentInfo.chapters_len,
      released = _ref$currentInfo.released,
      categories = _ref$currentInfo.categories,
      status = _ref$currentInfo.status,
      description = _ref$currentInfo.description,
      chapters = _ref$currentInfo.chapters,
      showLoader = _ref.showLoader,
      history = _ref.history;
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: showLoader ? 'info_container blur' : 'info_container', __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'title-container', __source: {
            fileName: _jsxFileName,
            lineNumber: 25
          }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'info-meta', __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 27
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                className: 'info-tags back-button',
                onClick: function onClick(_) {
                  return history.push('/');
                },
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 28
                }
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                  }
                },
                'Back'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-title', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 34
                }
              },
              title
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-meta-data', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 35
                }
              },
              'Artist: ',
              artist
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-meta-data', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 36
                }
              },
              'Author: ',
              author
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-meta-data', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 37
                }
              },
              'No of chapters: ',
              chapters_len
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-meta-data', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 38
                }
              },
              'Released on: ',
              released
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'info-meta-data', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 39
                }
              },
              'Status: ',
              status === 1 ? 'Ongoing' : 'Finished'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'info-tags', __source: {
                fileName: _jsxFileName,
                lineNumber: 43
              }
            },
            categories && categories.map(function (x) {
              return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 44
                  }
                },
                x
              );
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'info-title-image', __source: {
              fileName: _jsxFileName,
              lineNumber: 47
            }
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { alt: '', src: '' + BASE_URL + image, __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            }
          })
        )
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'info-description', __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'info-description-title', __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          }
        },
        'Description'
      ),
      description
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'chapters-container', __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'info-description-title', __source: {
            fileName: _jsxFileName,
            lineNumber: 57
          }
        },
        'Chapters'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 58
          }
        },
        chapters && chapters.map(function (x) {
          return !(Number(x[0]) === x[0] && x[0] % 1 !== 0) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            {
              className: 'chapter',
              onClick: function onClick(_) {
                return history.push('/chapter/' + x[3]);
              },
              __source: {
                fileName: _jsxFileName,
                lineNumber: 63
              }
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'chapter_no', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 67
                }
              },
              x[0]
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'chapter_name', __source: {
                  fileName: _jsxFileName,
                  lineNumber: 68
                }
              },
              x[2]
            )
          );
        })
      )
    )
  );
};

var withLifeCycle = Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["lifecycle"])({
  componentWillMount: function componentWillMount() {
    this.props.fetchInfo(this.props.match.params.mangaId);
  }
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_recompose__["compose"])(withLifeCycle, __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["withRouter"])(Info));

/***/ }),

/***/ "./src/common/containers/info/reducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__futils_createreducer__ = __webpack_require__("./src/common/futils/createreducer.js");



var ACTION_HANDLERS = {
  FETCHED_INFO: function FETCHED_INFO(s, a) {
    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, s, { currentInfo: a.payload });
  }
};

var initialState = {
  currentInfo: {}
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1__futils_createreducer__["a" /* default */])(initialState, ACTION_HANDLERS));

/***/ }),

/***/ "./src/common/containers/layout/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_nav__ = __webpack_require__("./src/common/components/nav/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home__ = __webpack_require__("./src/common/containers/home/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__browse__ = __webpack_require__("./src/common/containers/browse/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__info__ = __webpack_require__("./src/common/containers/info/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__loader__ = __webpack_require__("./src/common/containers/loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__chapter__ = __webpack_require__("./src/common/containers/chapter/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__layout_css__ = __webpack_require__("./src/common/containers/layout/layout.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__layout_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__layout_css__);
var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/layout/index.js';










var Layout = function Layout(_props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'main_layout', __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_nav__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__loader__["a" /* default */], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Switch"],
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/', component: __WEBPACK_IMPORTED_MODULE_3__home__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/browse', component: __WEBPACK_IMPORTED_MODULE_4__browse__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/info/:mangaId', component: __WEBPACK_IMPORTED_MODULE_5__info__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Route"], { exact: true, path: '/chapter/:chapterId', component: __WEBPACK_IMPORTED_MODULE_7__chapter__["a" /* default */], __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })
    )
  );
};

/* harmony default export */ __webpack_exports__["a"] = (Layout);

/***/ }),

/***/ "./src/common/containers/layout/layout.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".main_layout {\n  background: rgb(90, 97, 198);\n  background: radial-gradient(\n    circle,\n    rgba(90, 97, 198, 1) 12%,\n    rgba(32, 69, 145, 1) 100%\n  );\n  width: 100vw;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  font-family: 'Chela One', cursive;\n}\n", ""]);

// exports


/***/ }),

/***/ "./src/common/containers/loader/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__("babel-runtime/core-js/object/assign");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);

var _jsxFileName = '/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/common/containers/loader/index.js';




var Loader = function Loader(_ref) {
  var showLoader = _ref.showLoader;
  return showLoader ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    'div',
    { className: 'loader-overlay', __source: {
        fileName: _jsxFileName,
        lineNumber: 7
      }
    },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: 'lds-dual-ring', __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    })
  ) : __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  });
};

var mapStateToProps = function mapStateToProps(state) {
  return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, Object(__WEBPACK_IMPORTED_MODULE_3_ramda__["pick"])(['showLoader'], state.home));
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Loader));

/***/ }),

/***/ "./src/common/epics/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_home_epic__ = __webpack_require__("./src/common/containers/home/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_info_epic__ = __webpack_require__("./src/common/containers/info/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_browse_epic__ = __webpack_require__("./src/common/containers/browse/epic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_chapter_epic__ = __webpack_require__("./src/common/containers/chapter/epic.js");






var rootEpic = Object(__WEBPACK_IMPORTED_MODULE_0_redux_most__["combineEpics"])([__WEBPACK_IMPORTED_MODULE_1__containers_home_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__containers_info_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__containers_browse_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__containers_chapter_epic__["a" /* default */]]);

/* harmony default export */ __webpack_exports__["a"] = (rootEpic);

/***/ }),

/***/ "./src/common/futils/actionSpreader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (type, payload) {
  return { type: type, payload: payload };
});

/***/ }),

/***/ "./src/common/futils/createreducer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function (initialState, actionHandlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return actionHandlers.hasOwnProperty(action.type) ? actionHandlers[action.type](state, action) : state;
  };
});

/***/ }),

/***/ "./src/common/futils/curried.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Chain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Concat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Merge; });
/* unused harmony export Until */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Debounce; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__("ramda");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_most__ = __webpack_require__("most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__ = __webpack_require__("./src/common/futils/actionSpreader.js");




var Map = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["map"]);
var Chain = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["chain"]);
var Action = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_2__futils_actionSpreader__["a" /* default */]);
var Concat = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curry"])(__WEBPACK_IMPORTED_MODULE_1_most__["concat"]);
var Merge = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curryN"])(2, __WEBPACK_IMPORTED_MODULE_1_most__["merge"]);
var Until = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curryN"])(2, __WEBPACK_IMPORTED_MODULE_1_most__["until"]);
var Debounce = Object(__WEBPACK_IMPORTED_MODULE_0_ramda__["curryN"])(2, __WEBPACK_IMPORTED_MODULE_1_most__["debounce"]);

/***/ }),

/***/ "./src/common/reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_home_reducer__ = __webpack_require__("./src/common/containers/home/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_info_reducer__ = __webpack_require__("./src/common/containers/info/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_browse_reducer__ = __webpack_require__("./src/common/containers/browse/reducer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_chapter_reducer__ = __webpack_require__("./src/common/containers/chapter/reducer.js");






var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  home: __WEBPACK_IMPORTED_MODULE_1__containers_home_reducer__["a" /* default */],
  info: __WEBPACK_IMPORTED_MODULE_2__containers_info_reducer__["a" /* default */],
  browse: __WEBPACK_IMPORTED_MODULE_3__containers_browse_reducer__["a" /* default */],
  chapter: __WEBPACK_IMPORTED_MODULE_4__containers_chapter_reducer__["a" /* default */]
});

/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ "./src/common/store/configureStore.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most__ = __webpack_require__("redux-most");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_most___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_most__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger__ = __webpack_require__("redux-logger");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__("./src/common/reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__epics__ = __webpack_require__("./src/common/epics/index.js");







var epicMiddleware = Object(__WEBPACK_IMPORTED_MODULE_1_redux_most__["createEpicMiddleware"])(__WEBPACK_IMPORTED_MODULE_4__epics__["a" /* default */]);

var configureStore = function configureStore(preloadedState) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_3__reducers__["default"], preloadedState, Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(epicMiddleware, __WEBPACK_IMPORTED_MODULE_2_redux_logger___default.a));

  if (true) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./src/common/reducers/index.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__("./src/common/reducers/index.js"); (function () {
      var nextRootReducer = __webpack_require__("./src/common/reducers/index.js").default;
      store.replaceReducer(nextRootReducer);
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
  }

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server/index.js");



if (true) {
  module.hot.accept("./src/server/index.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__("./src/server/index.js"); (function () {
    console.log('🔁  HMR Reloading `./server`...');
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
  console.info('✅  Server-side HMR Enabled!');
}

var port = "3000" || 3000;

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_express___default()().use(function (req, res) {
  return __WEBPACK_IMPORTED_MODULE_1__server__["default"].handle(req, res);
}).listen(port, function (err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('> Started on port ' + port);
}));

/***/ }),

/***/ "./src/server/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("react-redux");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__("react");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__("express");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server__ = __webpack_require__("react-dom/server");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serialize_javascript__ = __webpack_require__("serialize-javascript");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_serialize_javascript__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom__ = __webpack_require__("react-router-dom");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_containers_layout__ = __webpack_require__("./src/common/containers/layout/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_store_configureStore__ = __webpack_require__("./src/common/store/configureStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__polyfill__ = __webpack_require__("./src/server/polyfill.js");
var _jsxFileName = "/home/kanitsharma/open-source/chikara/packages/mangaflux-web/src/server/index.js";









// import qs from 'qs';


var assets = __webpack_require__("./build/assets.json");

var server = __WEBPACK_IMPORTED_MODULE_2_express___default()();

server.disable("x-powered-by").use(__WEBPACK_IMPORTED_MODULE_2_express___default.a.static("/home/kanitsharma/open-source/chikara/packages/mangaflux-web/public")).get("/*", function (req, res) {
  // Read the counter from the request, if provided
  // const params = qs.parse(req.query);

  // Compile an initial state
  var preloadedState = {};

  // Create a new Redux store instance
  var store = Object(__WEBPACK_IMPORTED_MODULE_7__common_store_configureStore__["a" /* default */])(preloadedState);

  // Render the component to a string
  var markup = Object(__WEBPACK_IMPORTED_MODULE_3_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_0_react_redux__["Provider"],
    { store: store, __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_5_react_router_dom__["StaticRouter"],
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__common_containers_layout__["a" /* default */], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        }
      })
    )
  ));

  // Grab the initial state from our Redux store
  var finalState = store.getState();

  res.send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charSet='utf-8' />\n        <title>Mangaflux</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        " + (assets.client.css ? "<link rel=\"stylesheet\" href=\"" + assets.client.css + "\">" : "") + "\n          " + ( false ? "<script src=\"" + assets.client.js + "\" defer></script>" : "<script src=\"" + assets.client.js + "\" defer crossorigin></script>") + "\n    </head>\n    <body>\n        <div id=\"root\">" + markup + "</div>\n        <script>\n          window.__PRELOADED_STATE__ = " + __WEBPACK_IMPORTED_MODULE_4_serialize_javascript___default()(finalState) + "\n        </script>\n    </body>\n</html>");
});

/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ "./src/server/polyfill.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch__ = __webpack_require__("node-fetch");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_fetch__);


global.fetch = __WEBPACK_IMPORTED_MODULE_0_node_fetch___default.a;

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),

/***/ "babel-runtime/core-js/object/assign":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),

/***/ "babel-runtime/core-js/object/get-prototype-of":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),

/***/ "babel-runtime/helpers/classCallCheck":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),

/***/ "babel-runtime/helpers/createClass":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),

/***/ "babel-runtime/helpers/extends":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),

/***/ "babel-runtime/helpers/inherits":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),

/***/ "babel-runtime/helpers/possibleConstructorReturn":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "babel-runtime/helpers/toConsumableArray":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "invariant":
/***/ (function(module, exports) {

module.exports = require("invariant");

/***/ }),

/***/ "most":
/***/ (function(module, exports) {

module.exports = require("most");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "ramda":
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-redux":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "recompose":
/***/ (function(module, exports) {

module.exports = require("recompose");

/***/ }),

/***/ "redux":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-most":
/***/ (function(module, exports) {

module.exports = require("redux-most");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map