<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $users = User::where('isAdmin', 0)->paginate(8);
        return response(array(
            'success' => true,
            'users' => $users,
        ));
    }

    public function deleteUser($id) {
        User::destroy($id);
        return response(array(
            'success' => true,
            'message' => 'Delete user successfully!'
        ),200);
    }
}
