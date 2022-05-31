<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Restaurant;

class VerifyUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        
        $restaurantId = $request->route()->parameter('id');
        $restaurant = Restaurant::find($restaurantId);
        if(Auth()->user()->id == $restaurant->userId) {
            return $next($request);
        }
        return response(array('success' => false ,'message' => 'You are not allowed!'), 401);
    }
}
