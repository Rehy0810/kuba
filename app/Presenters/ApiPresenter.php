<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;


final class ApiPresenter extends BasePresenter
{

	public function actionDefault()
	{
		$days = $this->dayManager->getAll();
		$day = [];
		foreach($days as $d) {
			$day[] = [
				"den" => $d->name,
				"rutina" =>$d->routine->name,
				"casy"=> [
					"start" => (floor($d->routine->start/60) . ":" . (($d->routine->start%60 > 9)?($d->routine->start%60):('0'.($d->routine->start%60)))),
					"konec" => (floor($d->routine->end/60) . ":" . (($d->routine->end%60 > 9)?($d->routine->end%60):('0'.($d->routine->end%60))))
				],
				"delay"=> $d->routine->delay];
		}

		$this->sendResponse( new Nette\Application\Responses\JsonResponse( $day, "application/json;charset=utf-8" ) );
	}

	public function actionDelay()
	{
		$day = $this->dayManager->getDayOfWeek((int) date('w'));
		$enable = ($day->routine->start  < (date("H") * 60 + date("i"))) && ($day->routine->end  > (date("H") * 60 + date("i")));
		$time = $day->routine->start;
		$times = [];
		do {
			$times[] = $time;
			$time += $day->routine->delay;
		} while ($time <= $day->routine->end);

		$this->sendResponse( new Nette\Application\Responses\JsonResponse( [
			"enable"=> $enable,
			"spin_secs"=> $day->routine->spin_secs,
			"run_at"=> $times
		], "application/json;charset=utf-8" ) );
	}
}
