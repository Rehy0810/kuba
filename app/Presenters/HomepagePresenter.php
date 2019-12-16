<?php

declare(strict_types=1);

namespace App\Presenters;


final class HomepagePresenter extends BasePresenter
{
	public function renderDefault(): void
	{
		$this->template->days = $this->dayManager->getAll();
		$this->template->routines = $this->routineManager->getAll();
		$this->template->today = $this->dayManager->getDayOfWeek((int) date('w'));
	}
}
