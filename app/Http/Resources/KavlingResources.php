<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KavlingResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $deskripsi = "";
        $imagepath ="";
        if($this->size === "Single"){
            $deskripsi = "Kavling Standar Dengan 1 Lubang Pemakaman. Perawatan & Pengelolaan Yang Rutin dan Teratur";
            $imagepath="./images/single.png";
        }else if($this->size === "Family"){
            $deskripsi = "Kavling Dengan 2 Lubang Pemakaman. Cocok untuk pasangan atau keluarga kecil, Perawatan & Pengelolaan Yang Rutin dan Teratur";
            $imagepath = "./images/family.png";
        }else if($this->size === "Deluxe"){
            $deskripsi = "Kavling Premium Dengan 5 Lubang Pemakaman. VIP Room untuk Keluarga, Prioritas Pengelolaan & Perawatan Makam";
            $imagepath ="./images/deluxe.png";
        }


        return [
            'id' => $this->id,
            'number' => $this->number,
            'size' => $this->size,
            'price' => $this->price,
            'status' => $this->status,
            'description' => $deskripsi,
            'images' => $imagepath
        ];
    }
}
