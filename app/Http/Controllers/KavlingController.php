<?php

namespace App\Http\Controllers;

use App\Models\Kavling;
use Illuminate\Http\Request;

class KavlingController extends Controller
{

    public function index()
    {
        $plots = Kavling::all(); 
        return response()->json($plots);
    }

    public function store()
    {
    	
    }
}