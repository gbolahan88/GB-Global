import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET() {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("automobiles")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Automobiles fetch error:", error);

      return NextResponse.json(
        { error: "Failed to fetch automobiles" },
        { status: 500 }
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}