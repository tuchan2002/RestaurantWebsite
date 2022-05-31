<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class RestaurantController extends Controller
{
    public function index() {
        $restaurants = Restaurant::orderBy('created_at', 'DESC')->paginate(8);
        return response(array(
            'success' => true,
            'restaurants' => $restaurants,
        ));
    }

    public function getUserRestaurants() {
        $userId = Auth()->user()->id;
        $restaurants = Restaurant::where('userId', $userId)->orderBy('created_at', 'DESC')->paginate(8);
        return response(array(
            'success' => true,
            'restaurants' => $restaurants,
        ));
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);

        $hashedTooken = $request->bearerToken();
        $token = PersonalAccessToken::findToken($hashedTooken);
        $user = $token->tokenable;

        $newRestaurant = new Restaurant();
        $newRestaurant->name = $request->input('name');
        $newRestaurant->address = $request->input('address');
        $newRestaurant->description = $request->input('description');

        if($request->hasFile('image')) {
            $path = $request->file('image')->store('public/restaurants');
            $image_path = env('APP_URL').':8000/'.'storage/'.substr($path, strlen('public/'));
            $newRestaurant->image = $image_path;
        }

        $newRestaurant->userName = $user->username;
        $newRestaurant->userId = $user->id;
        $newRestaurant->save();

        return response(array(
            'success' => true,
            'message' => 'Create successfully!',
            'newRestaurant' => $newRestaurant,
        ));
    }
    
    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'description' => 'required',
            'image' => 'required'
        ]);
        
        $restaurant = Restaurant::find($id);

        $image_path = '';
        if($request->hasFile('image')) {
            $path = $request->file('image')->store('public/restaurants');
            $image_path = env('APP_URL').':8000/'.'storage/'.substr($path, strlen('public/'));
        }

        $newRestaurant = tap($restaurant)->update([
            'name' => $request->name,
            'address' => $request->address,
            'description' => $request->description,
            'image' => $image_path,
        ]);

        return response(array(
            'success' => true,
            'message' => 'Update successfully!',
            'restaurant' => $newRestaurant
        ));
    }

    public function destroy($id) {
        Restaurant::destroy($id);
        return response(array(
            'success' => true,
            'message' => 'Delete successfully!'
        ),200);
    }

    public function getRestaurant($id) {
        $restaurant = Restaurant::find($id);
        return response(array(
            'success' => true,
            'restaurant' => $restaurant
        ));
    }
}
