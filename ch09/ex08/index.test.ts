import {AlarmClock} from './index';

/**
 * 実装を変更しない方法としてReflectionを使う。
 * 実装内容を変更する場合は、コンストラクタをprivateにしてstateを挿入できるようにする方法がある。
 * その場合は、staticファクトリで通常生成関数`new`と`ofTest`を用意するとよい。
 */
test.each([
    { state: "normal", nextState: "alarmSet", action: "none"},
    { state: "alarmSet", nextState: "alarmSet", action: "none"},
    { state: "alarmSounding", nextState: "alarmSounding", action: "none"},
    { state: "snoozing", nextState: "snoozing", action: "none"},
])("setAlarm test $state -> $nextState: $action", ({state, nextState, action}) => {
    const alarmClock = new AlarmClock();
    Reflect.set(alarmClock, "state", state)
    expect(alarmClock.setAlarm()).toBe(action);
    expect(Reflect.get(alarmClock, "state")).toBe(nextState);
});

test.each([
    { state: "normal", nextState: "normal", action: "none"},
    { state: "alarmSet", nextState: "normal", action: "none"},
    { state: "alarmSounding", nextState: "normal", action: "stopAlarm"},
    { state: "snoozing", nextState: "normal", action: "none"},
])("cancelAlarm test $state -> $nextState: $action", ({state, nextState, action}) => {
    const alarmClock = new AlarmClock();
    Reflect.set(alarmClock, "state", state)
    expect(alarmClock.cancelAlarm()).toBe(action);
    expect(Reflect.get(alarmClock, "state")).toBe(nextState);
});

test.each([
    { state: "normal", nextState: "normal", action: "none"},
    { state: "alarmSet", nextState: "alarmSounding", action: "soundAlarm"},
    { state: "alarmSounding", nextState: "alarmSounding", action: "none"},
    { state: "snoozing", nextState: "snoozing", action: "none"},
])("reachedToAlarmTime test $state -> $nextState: $action", ({state, nextState, action}) => {
    const alarmClock = new AlarmClock();
    Reflect.set(alarmClock, "state", state)
    expect(alarmClock.reachedToAlarmTime()).toBe(action);
    expect(Reflect.get(alarmClock, "state")).toBe(nextState);
});

test.each([
    { state: "normal", nextState: "normal", action: "none"},
    { state: "alarmSet", nextState: "alarmSet", action: "none"},
    { state: "alarmSounding", nextState: "snoozing", action: "stopAlarm"},
    { state: "snoozing", nextState: "snoozing", action: "none"},
])("snooze test $state -> $nextState: $action", ({state, nextState, action}) => {
    const alarmClock = new AlarmClock();
    Reflect.set(alarmClock, "state", state)
    expect(alarmClock.snooze()).toBe(action);
    expect(Reflect.get(alarmClock, "state")).toBe(nextState);
});

test.each([
    { state: "normal", nextState: "normal", action: "none"},
    { state: "alarmSet", nextState: "alarmSet", action: "none"},
    { state: "alarmSounding", nextState: "alarmSounding", action: "none"},
    { state: "snoozing", nextState: "alarmSounding", action: "soundAlarm"},
])("elapseSnoozeTime test $state -> $nextState: $action", ({state, nextState, action}) => {
    const alarmClock = new AlarmClock();
    Reflect.set(alarmClock, "state", state)
    expect(alarmClock.elapseSnoozeTime()).toBe(action);
    expect(Reflect.get(alarmClock, "state")).toBe(nextState);
});