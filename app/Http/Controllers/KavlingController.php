<?php
 
namespace App\Http\Controllers;

use App\Models\Kavling;
use App\Http\Resources\KavlingResources;
use Illuminate\Http\Request;

class KavlingController extends Controller
{

    public function index()
    {
        $plots = Kavling::all(); 
        return KavlingResources::collection($plots);
    }

    public function store(Request $request)
    {
       $request->validate([
        'number'=>'required|max:255',
        'size'=>'required',
        'price'=>'required',
        'status' => 'required|string|in:available,booked,occupied' 
    ]);

    $plots = Kavling::create([
        'number' => $request->number,
        'size' => $request->size,
        'price' => $request->price,
        'status'=> $request->status
    ]);

    $message = "Data Berhasil tersimpan";
    return response()->json(['message' => $message], 201);

    }

    public function edit(Request $request, $id)
    {
        $request->validate([
        'size'=>'required',
        'price'=>'required',
        'status' => 'required|string|in:available,booked,occupied' 
        ]);

        $plots = Kavling::findOrFail($id);
        $plots->update($request->all());
        $message = "Data Berhasil Diubah";
        return response()->json($message);

    }

    public function destroy($id){
        $plots = Kavling::findOrFail($id);
        $plots->delete();

        $message = "Berhasil Dihapus";

        return response()->json($message);
    }


}