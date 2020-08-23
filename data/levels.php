<?php

function mixed(array $tubes): bool
{
	$mixed = true;
	foreach ($tubes as $tube) {
		if (count($tube) >= 2 && count(array_unique($tube)) == 1) {
			$mixed = false;
			break;
		}
	}
	return $mixed;
}

function randomise(array $tubes): array
{
	uksort($tubes, function() {
		return rand() > rand();
	});
	return $tubes;
}

function from(array $tubes): ?int
{
	$tubes = randomise($tubes);
	$fromTube = null;
	foreach ($tubes as $key => $tube) {
		if (count($tube) == 1 || (count($tube) >= 2 && $tube[0] == $tube[1])) {
			$fromTube = $key;
			break;
		}
	}
	return $fromTube;
}

function to(array $tubes, int $fromTube): ?int
{
	$tubes = randomise($tubes);
	$toTube = null;
	foreach ($tubes as $key => $tube) {
		if ($key != $fromTube && count($tubes[$key]) < 4) {
			$toTube = $key;
			break;
		}
	}
	return $toTube;
}

function move(array $tubes, string $lastMove): ?string
{
	$attempts = 0;
	$maximumAttempts = 64;
	while (true) {
		if ($attempts == $maximumAttempts) {
			return null;
		}
		$fromTube = from($tubes);
		if (!is_null($fromTube)) {
			$toTube = to($tubes, $fromTube);
			if (!is_null($toTube)) {
				$move = $fromTube . "," . $toTube;
				if ($move != $lastMove) {
					return $move;
				}
			}
		}
		$attempts += 1;
	}
}

function rearrange(array $tubes, int $minimumMoves): ?array
{
	echo "rearrange\n";
	$moves = 0;
	$lastMove = "";
	while (true) {
		if ($moves >= $minimumMoves && mixed($tubes)) {
			return $tubes;
		}
		$move = move($tubes, $lastMove);
		if (is_null($move)) {
			return null;
		}
		$keys = explode(",", $move, 2);
		$fromTube = intval($keys[0]);
		$toTube = intval($keys[1]);
		$ball = array_shift($tubes[$fromTube]);
		array_unshift($tubes[$toTube], $ball);
		$moves += 1;
		$lastMove = $move;
	}
}

function generate(int $fullTubes, int $emptyTubes, int $minimumMoves): string
{
	echo "generate\n";
	$template = [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[2, 2, 2, 2],
		[3, 3, 3, 3],
		[4, 4, 4, 4],
		[5, 5, 5, 5]
	];
	$tubes = array_merge(array_splice($template, 0, $fullTubes), array_fill(0, $emptyTubes, []));
	while (true) {
		$rearrangedTubes = rearrange($tubes, $minimumMoves);
		if (!is_null($rearrangedTubes)) {
			return json_encode($rearrangedTubes);
		}
	}
}

function unique_generate(int $count, int $fullTubes, int $emptyTubes, int $minimumMoves): array
{
	echo "unique_generate\n";
	$levels = [];
	while (true) {
		if (count($levels) == $count) {
			return array_values($levels);
		}
		$level = generate($fullTubes, $emptyTubes, $minimumMoves);
		$key = md5($level);
		if (!array_key_exists($key, $levels)) {
			$levels[$key] = $level;
		}
	}
}

$settings = [
	[140, 2, 2],
	[280, 3, 2],
	[280, 4, 2],
	[280, 5, 2],
	[420, 6, 2]
];
$file = 1;
foreach ($settings as $setting) {
	list($count, $fullTubes, $emptyTubes) = $setting;
	$levels = unique_generate($count, $fullTubes, $emptyTubes, 4);
	foreach ($levels as $level) {
		echo $file . "\n";
		file_put_contents(__DIR__ . "/data/" . $file . ".json", $level);
		$file += 1;
	}
}
