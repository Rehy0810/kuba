<?php

declare(strict_types=1);

namespace App\Model;

use Nette;
use Nette\Security\Passwords;


/**
 * Users management.
 */
final class UserManager implements Nette\Security\IAuthenticator
{
	use Nette\SmartObject;

	private const
		TABLE_NAME = 'user',
		COLUMN_ID = 'user_id',
		COLUMN_NAME = 'username',
		COLUMN_PASSWORD_HASH = 'password',
		COLUMN_DISP_NAME = 'name',
		COLUMN_ROLE = 'role';


	/** @var Nette\Database\Context */
	private $database;

	/** @var Passwords */
	private $passwords;


	public function __construct(Nette\Database\Context $database, Passwords $passwords)
	{
		$this->database = $database;
		$this->passwords = $passwords;
	}


	/**
	 * Performs an authentication.
	 * @throws Nette\Security\AuthenticationException
	 */
	public function authenticate(array $credentials): Nette\Security\IIdentity
	{
		[$username, $password] = $credentials;

		$row = $this->database->table(self::TABLE_NAME)
			->where(self::COLUMN_NAME, $username)
			->fetch();
		if (!$row) {
			$row = $this->database->table(self::TABLE_NAME)
				->where(self::COLUMN_EMAIL, $username)
				->fetch();
		}
		if (!$row) {
			throw new Nette\Security\AuthenticationException('Zadané údaje nesouhlasí.', self::IDENTITY_NOT_FOUND);

		} elseif (!$this->passwords->verify($password, $row[self::COLUMN_PASSWORD_HASH])) {
			throw new Nette\Security\AuthenticationException('Zadané údaje nesouhlasí.', self::INVALID_CREDENTIAL);

		} elseif ($this->passwords->needsRehash($row[self::COLUMN_PASSWORD_HASH])) {
			$row->update([
				self::COLUMN_PASSWORD_HASH => $this->passwords->hash($password),
			]);
		}

		$arr = $row->toArray();
		unset($arr[self::COLUMN_PASSWORD_HASH]);
		return new Nette\Security\Identity($row[self::COLUMN_ID], $row[self::COLUMN_ROLE], $arr);
	}


	/**
	 * Adds new user.
	 * @throws DuplicateNameException
	 */
	public function add(string $username, string $password, $role = 2): void
	{
		try {
			$this->database->table(self::TABLE_NAME)->insert([
				self::COLUMN_NAME => $username,
				self::COLUMN_PASSWORD_HASH => $this->passwords->hash($password),
				self::COLUMN_ROLE => $role,
			]);
		} catch (Nette\Database\UniqueConstraintViolationException $e) {
			throw new DuplicateNameException;
		}
	}

	public function update(int $id, string $username, string $password, string $name, $role = null): bool
	{
		$update = [];
		$update['username'] = $username;
		$update['password'] = $password;
		$update['name'] = $name;
		if ($role)
			$update['role'] = $role;
		
		$user = $this->database->table(self::TABLE_NAME)->get($id);
		if (!$user)
			return false;
		return $user->update($update);
	}

	public function delete(int $id): bool
	{
		$user = $this->database->table(self::TABLE_NAME)->get($id);
		if (!$user)
			return false;
		return $user->delete();
	}

	public function get($id)
	{
		if (is_int($id)) {
			return $this->database->table(self::TABLE_NAME)->get($id);
		} else if (is_string($id)) {
			return $this->database->table(self::TABLE_NAME)->where('username LIKE ?',$id)->fetch();
		} else {
			return null;
		}
	}

	public function getAll() {
		return $this->database->table(self::TABLE_NAME)->fetchAll();
	}
}



class DuplicateNameException extends \Exception
{
}
