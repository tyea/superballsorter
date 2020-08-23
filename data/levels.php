<?php

function is_mixed(array $tubes): bool
{
	$mixed = true;
	foreach ($tubes as $tube) {
		$balls = implode("", $tube);
		$regex = "/0{3}|1{3}|2{3}|3{3}|4{3}|5{3}|6{3}|7{3}/";
		if (preg_match($regex, $balls)) {
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

function generate_move(array $tubes, string $lastMove): ?string
{
	$fromTubes = randomise($tubes);
	$toTubes = randomise($tubes);
	foreach ($fromTubes as $fromKey => $fromTube) {
		foreach ($toTubes as $toKey => $toTube) {
			$validFrom = count($fromTube) == 1 || (count($fromTube) > 1 && $fromTube[0] == $fromTube[1]);
			$validTo = count($toTube) < 4 && $fromKey != $toKey;
			$move = $fromKey . "," . $toKey;
			$validMove = $move != $lastMove;
			if ($validFrom && $validTo && $validMove) {
				return $move;
			}
		}
	}
	return null;
}

function generate_level(array $tubes): ?array
{
	$moves = 0;
	$lastMove = "";
	while (true) {
		if ($moves > 128) {
			return null;
		} else if (is_mixed($tubes)) {
			return $tubes;
		}
		$move = generate_move($tubes, $lastMove);
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

function generate_levels(int $count, array $tubes): array
{
	$levels = [];
	while (count($levels) < $count) {
		$tubes = array_values(randomise($tubes));
		$level = generate_level($tubes);
		if (is_null($level)) {
			continue;
		}
		$key = md5(json_encode($level));
		if (!array_key_exists($key, $levels)) {
			$levels[$key] = $level;
		}
	}
	return array_values($levels);
}

function generate_tubes(int $count): array
{
	$tubes = [];
	$colours = range(0, $count - 1);
	foreach ($colours as $colour) {
		$tubes[] = array_fill(0, 4, $colour);
	}
	$tubes[] = [];
	$tubes[] = [];
	return $tubes;
}

function write_levels(array $levels, int $start): void
{
	foreach ($levels as $key => $value) {
		$path = __DIR__ . "/" . ($start + $key) . ".json";
		$contents = json_encode($value);
		file_put_contents($path, $contents);
	}
}

function generate_tubes_generate_write_levels(int $from, int $levels, int $colours)
{
	$tubes = generate_tubes($colours);
	$levels = generate_levels($levels, $tubes);
	write_levels($levels, $from);
}

generate_tubes_generate_write_levels(1, 4, 2);
generate_tubes_generate_write_levels(5, 8, 3);
generate_tubes_generate_write_levels(13, 16, 4);
generate_tubes_generate_write_levels(29, 32, 5);
generate_tubes_generate_write_levels(61, 64, 6);
generate_tubes_generate_write_levels(125, 260, 7);
