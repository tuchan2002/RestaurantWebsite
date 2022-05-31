<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        // simple validation
        if(!$request->username || !$request->password) {
            return response(array('success' => false, 'message' => "Missing username and/or password"), 400);
        }

        $user = User::where('username',$request->username)->first();
        if($user) {
            return response(array('success' => false, 'message' => "Username already taken"), 400);
        }

        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);

        $accessToken = $user->createToken('tuchan17')->plainTextToken;

        $response = [
            'success' => true,
            'user' => $user,
            'accessToken' => $accessToken
        ];

        return response($response, 201);
    }

    public function login(Request $request) {
        // simple validation
        if(!$request->username || !$request->password) {
            return response(array('success' => false, 'message' => "Missing username and/or password"), 400);
        }

        $user = User::where('username', $request->username)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'success' => false,
                'message' => 'Incorrect username or password'
            ], 400);
        }

        $accessToken = $user->createToken('tuchan17')->plainTextToken;
        
        $response = [
            'success' => true,
            'user' => $user,
            'accessToken' => $accessToken
        ];

        return response($response, 201);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        
        return [
            'message' => 'Logged out',
            'success' => true,
        ];
    }

    public function checkUserLoggedIn() {
        $user = Auth()->user();
        return response(array('success' => true, 'user' => $user));
    }
}
