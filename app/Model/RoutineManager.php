<?php

declare(strict_types=1);

namespace App\Model;

use Nette;


/**
 * Routine management.
 */
final class RoutineManager
{

	private const
		TABLE_NAME = 'routine',
		COLUMN_ID = 'routine_id',
		COLUMN_NAME = 'name',
		COLUMN_START = 'start',
		COLUMN_END = 'end',
		COLUMN_DELAY = 'delay';


	/** @var Nette\Database\Context */
	private $database;


	public function __construct(Nette\Database\Context $database)
	{
		$this->database = $database;
	}

	public function addRoutine($values):void {
		try {
			$this->database->table(self::TABLE_NAME)->insert($values);
		} catch (Nette\Database\UniqueConstraintViolationException $e) {
			throw new DuplicateNameException;
		}
	}

	public function getRoutine(int $id) {
		return $this->database->table(self::TABLE_NAME)->get($id);
	}

	public function getRoutineByName(string $name) {
		return $this->database->table(self::TABLE_NAME)->where('name LIKE %?%',$id);
	}

	public function getRoutineForDay(int $day) {
		return $this->database->table('day')->get($id)->ref('routine','routine_id');
	}

	public function deleteRoutine(int $id) {
		return $this->database->table(self::TABLE_NAME)->get($id)->delete();
	}

	public function updateRoutine(int $id, $values) {
		$routine = $this->database->table(self::TABLE_NAME)->get($id);
		if ($routine) {
			return $routine->update($values);
		} else {
			return null;
		}
	}

	public function getAll() {
		return $this->database->table(self::TABLE_NAME)->fetchAll();
	}
}