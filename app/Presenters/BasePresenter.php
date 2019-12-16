<?php

declare(strict_types=1);

namespace App\Presenters;

use Nette;
use App;
use Tracy\Debugger;
use Latte;


/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{

    /** @var App\Model\UserManager @inject */
	public $userManager;

	/** @var App\Model\DayManager @inject */
	public $dayManager;

	/** @var App\Model\RoutineManager @inject */
    public $routineManager;

    protected function beforeRender()
    {
        $this->template->addFilter('mth', function ($minutes) {
            $hodiny = floor($minutes / 60);
            $minuty = $minutes % 60;
            $minuty .= ($minutes % 60 < 10)? '0':'';
            return ($hodiny . ':' . $minuty);
        });
    }
    
}
