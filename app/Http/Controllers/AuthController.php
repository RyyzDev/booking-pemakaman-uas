<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Fungsi Register
    // public function register(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users',
    //         'password' => 'required|string|min:8|confirmed',
    //     ]);

    //     $user = User::create([
    //         'name' => $validatedData['name'],
    //         'email' => $validatedData['email'],
    //         'password' => Hash::make($validatedData['password']), 
    //         'is_admin' => true, 
    //     ]);

    //     return response()->json(['message' => 'Registrasi Admin berhasil.'], 201);
    // }
    
    // Fungsi Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Cek user, password, dan status admin
        if (! $user || ! Hash::check($request->password, $user->password) || ! $user->is_admin) {
            throw ValidationException::withMessages([
                'email' => ['Kredensial atau hak akses tidak valid.'],
            ]);
        }
        $token = $user->createToken('admin-access')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }

    // Fungsi Logout
    public function logout(Request $request)
    {
       $request->user()->currentAccessToken()->delete(); 
        return response()->json(['message' => 'Successfully logged out'], 204);
    }
}