<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class UsersController extends Controller
{
    private $users;
    public function __construct(){
        $this->users = new Users();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function login(Request $request)
    {
        
       
    $rules = [
        'account' => 'required',
        'password' => 'required',
    ];

    $messages = [
        'account.required' => 'Vui lòng nhập tài khoản',
        'password.required' => 'Vui lòng nhập mật khẩu',
    ];

    $validator = Validator::make($request->all(),$rules,$messages);

    $validator->validate();

    $data = [
        'account' => $request->account,
        'password' => $request->password
    ];
    $res = $this->users->login($data);
    
   return response()->json($res);
    }

    public function signUp(Request $request)
    {


        $rules = [
            'name' => 'required',
            'account' => 'required|unique:users',
            'password' => 'required|min:8',
            'repassword' => 'required|same:password',
        ];

        $messages = [
            'name.required' => 'Vui lòng nhập họ và tên',
            'account.required' => 'Vui lòng nhập tài khoản',
            'account.unique' => 'Tài khoản đã tồn tại',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu cần có ít nhât :min ký tự',
            'repassword.required' => 'Vui lòng nhập lại mật khẩu',
            'repassword.same' => 'Vui lòng nhập lại đúng mật khẩu',
        ];

        $validator = Validator::make($request->all(),$rules,$messages);

        $validator->validate();

        $data = [
            'account' => $request->account,
            'password' => $request->password,
            'name' => $request->name,
        ];

        $res = $this->users->insertData($data);

        
       return response()->json($res);
    }


    public function logout(Request $request)
    {
        //
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('',204);
    }
}
