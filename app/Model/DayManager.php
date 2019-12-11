<?php

declare(strict_types=1);

namespace App\Model;

use Nette;


/**
 * Day management.
 */
final class DayManager
{

	private const
		TABLE_NAME = 'day',
		COLUMN_ID = 'day_id',
		COLUMN_DAY_OF_WEEK = 'day_of_week',
		COLUMN_NAME = 'name',
		COLUMN_ROUTINE = 'routine_id';


	/** @var Nette\Database\Context */
	private $database;


	public function __construct(Nette\Database\Context $database)
	{
		$this->database = $database;
	}

	public function getDay(int $id) {
		return $this->database->table(self::TABLE_NAME)->get($id);
	}

	public function getDayByName(string $name) {
		return $this->database->table(self::TABLE_NAME)->where('name LIKE %?%',$id);
	}

	public function updateDay(int $id, $values) {
		$routine = $this->database->table(self::TABLE_NAME)->get($id);
		if ($routine) {
			return $routine->update($values);
		} else {
			return null;
		}
	}

	public function getDayOfWeek(int $day) {
		return $this->database->table(self::TABLE_NAME)->where('day_of_week = ?',$day)->fetch();
	}

	public function getAll() {
		return $this->database->table(self::TABLE_NAME)->fetchAll();
	}
}
