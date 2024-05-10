// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_weather(location_name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", location_name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_weather])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
