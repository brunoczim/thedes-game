use crate::graphics::string::{GString, Grapheme};

#[test]
fn valid_grapheme() {
    Grapheme::new("a").unwrap();
    Grapheme::new("ç").unwrap();
    Grapheme::new("ỹ").unwrap();
    Grapheme::new(" ").unwrap();
    Grapheme::new("ẽ̞").unwrap();
}

#[test]
fn invalid_grapheme() {
    Grapheme::new("\u{31e}").unwrap_err();
    Grapheme::new("").unwrap_err();
    Grapheme::new("abcde").unwrap_err();
    Grapheme::new("\n").unwrap_err();
}

#[test]
fn lossy_grapheme() {
    assert_eq!(Grapheme::new_lossy("a").as_str(), "a");
    assert_eq!(Grapheme::new_lossy("ç").as_str(), "ç");
    assert_eq!(Grapheme::new_lossy("ỹ").as_str(), "ỹ");
    assert_eq!(Grapheme::new_lossy(" ").as_str(), " ");
    assert_eq!(Grapheme::new_lossy("ẽ̞").as_str(), "ẽ̞");
    assert_eq!(Grapheme::new_lossy("\u{31e}").as_str(), "�̞");
    assert_eq!(Grapheme::new_lossy("").as_str(), "�");
    assert_eq!(Grapheme::new_lossy("abcde").as_str(), "a");
    assert_eq!(Grapheme::new_lossy("\n").as_str(), "�");
}

#[test]
fn valid_gstring() {
    GString::new("abc").unwrap();
    GString::new("çedilha").unwrap();
    GString::new("ỹ").unwrap();
    GString::new(" ").unwrap();
    GString::new("ẽ̞").unwrap();
}

#[test]
fn invalid_gstring() {
    GString::new("\u{31e}abc").unwrap_err();
    Grapheme::new("aa\n").unwrap_err();
}

#[test]
fn lossy_gstring() {
    assert_eq!(GString::new_lossy("a").as_str(), "a");
    assert_eq!(GString::new_lossy("ç").as_str(), "ç");
    assert_eq!(GString::new_lossy("ỹ").as_str(), "ỹ");
    assert_eq!(GString::new_lossy(" ").as_str(), " ");
    assert_eq!(GString::new_lossy("ẽ̞").as_str(), "ẽ̞");
    assert_eq!(GString::new_lossy("\u{31e}").as_str(), "�̞");
    assert_eq!(GString::new_lossy("").as_str(), "");
    assert_eq!(GString::new_lossy("abcde").as_str(), "abcde");
}
