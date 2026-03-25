//! Event emission helpers for the Tipz contract.
//!
//! Every on-chain action that mutates meaningful state emits an event so that
//! off-chain indexers can follow contract activity without replaying every
//! transaction.
//!
//! ## Naming convention
//! Topic tuple  → `(Symbol,)`          – identifies the event type
//! Data tuple   → `(field, field, …)`  – the payload

use soroban_sdk::{symbol_short, Address, Env, String};

// ── Profile events ────────────────────────────────────────────────────────────

/// Emitted by `register_profile` when a new creator profile is created.
///
/// Topics : `("ProfReg",)`
/// Data   : `(owner: Address, username: String)`
pub fn emit_profile_registered(env: &Env, owner: &Address, username: &String) {
    env.events()
        .publish((symbol_short!("ProfReg"),), (owner.clone(), username.clone()));
}

/// Emitted by `update_profile` when a creator updates their profile.
///
/// Topics : `("ProfUpd",)`
/// Data   : `(owner: Address,)`
pub fn emit_profile_updated(env: &Env, owner: &Address) {
    env.events()
        .publish((symbol_short!("ProfUpd"),), (owner.clone(),));
}

// ── Tip events ────────────────────────────────────────────────────────────────

/// Emitted by `send_tip` when a tip is successfully sent.
///
/// Topics : `("TipSent",)`
/// Data   : `(tipper: Address, creator: Address, amount: i128)`
pub fn emit_tip_sent(env: &Env, tipper: &Address, creator: &Address, amount: i128) {
    env.events().publish(
        (symbol_short!("TipSent"),),
        (tipper.clone(), creator.clone(), amount),
    );
}

/// Emitted by `withdraw_tips` when a creator withdraws their accumulated tips.
///
/// Topics : `("TipWith",)`
/// Data   : `(creator: Address, net: i128, fee: i128)`
pub fn emit_tips_withdrawn(env: &Env, creator: &Address, net: i128, fee: i128) {
    env.events()
        .publish((symbol_short!("TipWith"),), (creator.clone(), net, fee));
}

// ── Credit score events ───────────────────────────────────────────────────────

/// Emitted when a creator's credit score changes.
///
/// Topics : `("CreditUpd",)`
/// Data   : `(creator: Address, old_score: u32, new_score: u32)`
pub fn emit_credit_score_updated(env: &Env, creator: &Address, old_score: u32, new_score: u32) {
    env.events().publish(
        (symbol_short!("CreditUpd"),),
        (creator.clone(), old_score, new_score),
    );
}

// ── Admin events ──────────────────────────────────────────────────────────────

/// Emitted by `set_admin` when the admin role is transferred.
///
/// Topics : `("AdminChg",)`
/// Data   : `(old_admin: Address, new_admin: Address)`
pub fn emit_admin_changed(env: &Env, old_admin: &Address, new_admin: &Address) {
    env.events().publish(
        (symbol_short!("AdminChg"),),
        (old_admin.clone(), new_admin.clone()),
    );
}

/// Emitted by `set_fee` when the platform fee is changed.
///
/// Topics : `("FeeUpdate",)`
/// Data   : `(old_bps: u32, new_bps: u32)`
pub fn emit_fee_updated(env: &Env, old_bps: u32, new_bps: u32) {
    env.events()
        .publish((symbol_short!("FeeUpdate"),), (old_bps, new_bps));
}

/// Emitted by `set_fee_collector` when the fee-receiving address changes.
///
/// Topics : `("FeeColl",)`
/// Data   : `(new_collector: Address,)`
pub fn emit_fee_collector_updated(env: &Env, new_collector: &Address) {
    env.events()
        .publish((symbol_short!("FeeColl"),), (new_collector.clone(),));
}

/// Emitted by `batch_update_x_metrics` when an address is skipped because it
/// has no registered profile.
///
/// Topics : `("XSkipped",)`
/// Data   : `(address: Address,)`
pub fn emit_x_metrics_batch_skipped(env: &Env, address: &Address) {
    env.events()
        .publish((symbol_short!("XSkipped"),), (address.clone(),));
}
